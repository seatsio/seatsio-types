#!/usr/bin/env zx

$.verbose = false

const semver = require('semver')
const versionToBump = getVersionToBump()
const latestReleaseTag = await fetchLatestReleasedVersionNumber()
const latestVersion = removeLeadingV(latestReleaseTag)
const nextVersion = await determineNextVersionNumber(latestVersion)

await assertChangesSinceRelease(latestReleaseTag)
await bumpVersionInFiles()
await commitAndPush()
await release()

function getVersionToBump() {
    if (!argv.v || !(argv.v === 'minor' || argv.v === 'major')) {
        throw new Error ("Please specify -v major/minor")
    }
    return argv.v
}

function removeLeadingV(tagName) {
    if (tagName.startsWith('v')) {
        return tagName.substring(1)
    }
    return tagName
}

async function fetchLatestReleasedVersionNumber() {
    let result = await $`gh release view --json tagName`
    return JSON.parse(result).tagName
}

async function determineNextVersionNumber(previous) {
    return semver.inc(previous, versionToBump)
}

async function bumpVersionInFiles() {
    await replaceInFile("package.json", `"version": "${latestVersion}",`, `"version": "${nextVersion}",`)
}

async function replaceInFile(filename, latestVersion, nextVersion) {
    return await fs.readFile(filename, 'utf8')
        .then(text => {
            if (text.indexOf(latestVersion) < 0) {
                throw new Error('Not the correct version. Could not find ' + latestVersion + ' in ' + filename)
            }
            return text
        })
        .then(text => text.replace(latestVersion, nextVersion))
        .then(text => fs.writeFileSync(filename, text))
        .then(() => gitAdd(filename))
}

async function gitAdd(filename) {
    return await $`git add ${filename}`
}

async function commitAndPush() {
    await $`git commit -m "version bump"`
    await $`git push origin main`
}

async function getCurrentCommitHash() {
    return (await $`git rev-parse HEAD`).stdout.trim()
}

async function getCommitHashOfTag(tag) {
    return (await $`git rev-list -n 1 ${tag}`).stdout.trim()
}

async function assertChangesSinceRelease(releaseTag) {
    let mainCommitHash = await getCurrentCommitHash()
    let releaseCommitHash = await getCommitHashOfTag(releaseTag)
    if(mainCommitHash === releaseCommitHash) {
        throw new Error("No changes on main since release tagged " + releaseTag)
    }
}

async function release() {
    const newTag = 'v' + nextVersion
    return await $`gh release create ${newTag} --generate-notes`.catch(error => {
        console.error('something went wrong while creating the release. Please revert the version change!')
        throw error
    })
}
