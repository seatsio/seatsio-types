import core from '@actions/core'
import { execSync } from 'child_process'
import cliSelect from 'cli-select-2'
import fs from 'fs'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'

const argv = yargs(hideBin(process.argv))
    .option('versionChange', {
        alias: 'v',
        type: 'string',
        description: 'Version change type. Possible values are patch, minor, major.'
    }).parse()

const validArgs = ['current', 'minor', 'major', 'patch']

const execute = cmd => {
    execSync(cmd, { stdio: 'inherit' })
}

const bumpVersion = async (versionType) => {
    if (versionType !== 'current') {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
        const currentVersion = packageJson.version
        let [major, minor, patch] = currentVersion.split('.').map(v => parseInt(v, 10))

        switch (versionType) {
            case 'major':
                major += 1
                minor = patch = 0
                break
            case 'minor':
                minor += 1
                patch = 0
                break
            case 'patch':
                patch += 1
                break
        }

        const newVersion = `${major}.${minor}.${patch}`
        packageJson.version = newVersion
        core.setOutput('newVersion', newVersion)
        fs.writeFileSync('package.json', JSON.stringify(packageJson, undefined, 4))
        console.log(`\nDone! Package file updated to ${newVersion}.`)
    }
}

const onSelect = (selection) => {
    if (selection.value && typeof selection.value === 'string') {
        bumpVersion(selection.value.toLowerCase())
    }
}

const versionBump = argv.v
if (validArgs.indexOf(versionBump) !== -1) {
    bumpVersion(versionBump)
} else {
    const options = {
        values: {
            'Keep current version': 'current',
            'Patch': 'patch',
            'Minor': 'minor',
            'Major': 'major',
        },
        defautValue: 0
    }
    
    cliSelect(options, onSelect)
}