declare global {
    var seatsio: Seatsio
}

interface SeatingChartConstructor {
    new(config: ChartRendererConfigOptions): SeatingChart
}

interface EventManagerConstructor {
    new(config: EventManagerConfigOptions): EventManager
}

interface ChartDesignerConstructor {
    new(config: ChartDesignerConfigOptions): ChartDesigner
}

export interface Seatsio {
    SeatingChart: SeatingChartConstructor
    EventManager: EventManagerConstructor
    SeatingChartDesigner: ChartDesignerConstructor
}

export interface CommonConfigOptions {
    /**
     * The parent {@link https://developer.mozilla.org/en-US/docs/Web/API/Element Element} in which the chart gets rendered.
     * Either pass in `container` or `divId`, but not both.
     */
    container?: Element
    /**
     * The id of the <div> element on your page in which you want seats.io to render the seating chart.
     * Either pass in `divId` or `container`, but not both.
     */
    divId?: string
}

interface WithEvents {
    event?: string
    events?: string[]
}

interface WithEvent {
    event: string
}

type Session = 'continue' | 'manual' | 'none' | 'start'

export interface ChartRendererConfigOptions extends DeprecatedConfigProperties, CommonConfigOptions, ChartRendererCallbacks {
    /**
     * Allows to render a multi-floor seating chart with specific floor selected, instead of the default all-floors view.
     */
    activeFloor?: string
    /**
     * The key of the events for which you want to render the seating chart.
     * Note: Channels functionality is not supported when using an event group with multiple events. Use {@link https://docs.seats.io/docs/api/seasons seasons} for that.
     */
    events?: string[]
    /**
     * This parameter supports the following values:
     * - **normal**: the default setting. Objects are selectable, and zooming and panning are enabled
     * - **static**: objects are not selectable, but zooming and panning is enabled
     * - **print**: objects are not selectable and zooming and panning is disabled
     * - **spotlight**: shows selected objects while dimming all others. Navigation controls are enabled but interaction is disabled.
     * @default normal
     */
    mode?: ChartRendererMode
    /**
     * Allows to toggle on or off some features of the cursor tooltip, displayed when hovering objects when using pointing devices like a mouse, or when tapping on an object on touch devices.
     */
    objectTooltip?: ChartRendererObjectTooltip
    /**
     * Seats supports two types of pricing: simple pricing and multi-level pricing. {@link https://docs.seats.io/docs/renderer/config-pricing See documentation}
     */
    pricing?: Pricing
    /**
     * Formats the price into a custom defined string when showing it to and en user. {@link https://docs.seats.io/docs/renderer/config-priceformatter See documentation}
     */
    priceFormatter?: (price: number) => string
    /**
     * When true, overlays the price or price range of a section on top of it when the chart is zoomed out.
     */
    showSectionPricingOverlay?: boolean
    /**
     * The public workspace key for the workspace in which the chart was created. You can find it on your {@link https://app.seats.io/workspace-settings workspace settings} page.
     * */
    workspaceKey: string
    /**
     * The key of the event (or the season) for which you want to render the seating chart.
     */
    event?: string

    /** Custom data to be passed to certain callbacks. {@link https://docs.seats.io/docs/renderer/config-extraconfig/ See documentation} for information. */
    extraConfig?: ExtraConfig
    /**
     * Render the chart with the specified objects selected (if they are still free). {@link https://docs.seats.io/docs/renderer/config-selectedobjects See documentation}
     */
    selectedObjects?: (string | SelectedObject | SelectedGA)[]
    /**
     * Render the chart with the specified objects selectable. {@link https://docs.seats.io/docs/renderer/selectableobjects See documentation}
     */
    selectableObjects?: string[]
    /**
     * Selection validators run every time a seat is selected or deselected. They check whether there are no orphan seats, and/or whether all selected seats are consecutive (meaning: next to each other and in the same category). {@link https://docs.seats.io/docs/renderer/config-selectionvalidators See documentation}
     */
    selectionValidators?: SelectionValidator[]
    /**
     * Restrict the number of objects a user is allowed to select. This can be configured based on total number of tickets, ticket types, categories or a combination of both. {@link https://docs.seats.io/docs/renderer/config-maxselectedobjects See documentation} for detailed information.
     */
    maxSelectedObjects?: SelectionLimiter
    /**
     * Activates one-click selection mode. {@link https://docs.seats.io/docs/renderer/config-numberofplacestoselect See documentation}
     */
    numberOfPlacesToSelect?: number
    /**
     * If true, users will get a button on the top left hand side they can use to switch between different selection modes: seat selection, rectangle selection or lasso selection. {@link https://docs.seats.io/docs/renderer/config-multiselectenabled See documentation}
     * @default false
     */
    multiSelectEnabled?: boolean
    /**
     * This function is invoked when a user clicks on a GA area. If canGASelectionBeIncreased returns true, the user is able to increase the number of selected places by clicking on the + button of the ticket selector that pops up.
     * @param gaArea The GA area that has been selected.
     * @param defaultValue A boolean that indicates if additional GA places can be selected. This is determined by whether the number of selected places plus the number places booked by other users is smaller than the capacity of the GA area.
     * @param extraConfig Variables and data from your application. See extraConfig.
     * @param ticketType The ticket type for which the user clicked on the plus button. Optional.
     * {@link https://docs.seats.io/docs/renderer/config-cangaselectionbeincreased See documentation}
     */
    canGASelectionBeIncreased?: (gaArea: GeneralAdmissionAreaProps, defaultValue: boolean, extraConfig: ExtraConfig, ticketType?: TicketTypeJson) => boolean
    /**
     * If your chart div is enclosed within a <form>element, you can use this configuration option to automatically add the selected seat IDs to the form data. This is one of the ways you can pass the selected seats to your server, so that you can book them later on through the Seats API.
     * {@link https://docs.seats.io/docs/renderer/config-selectedobjectsinputname See documentation}
     */
    selectedObjectsInputName?: string
    /**
     * If set to `false`, objects that don't have pricing information will be rendered as not selectable (i.e. greyed out).
     * @default true
     */
    objectWithoutPricingSelectable?: boolean
    /**
     * If set to `false`, objects that don't have a category will be rendered as not selectable (i.e. greyed out).
     * @default true.
     */
    objectWithoutCategorySelectable?: boolean
    /**
     * A function whose result will be displayed as extra information on the cursor tooltip. {@link https://docs.seats.io/docs/renderer/config-tooltipinfo See documentation}
     */
    tooltipInfo?: <T extends SelectableObjectProps>(object: T) => string
    /**
     * On mobile, when displaying a chart with sections, a tooltip is shown at the bottom of the screen with the section name and pricing.
     * You can hide this tooltip on mobile by passing `showActiveSectionTooltipOnMobile: false`.
     * @default true
     */
    showActiveSectionTooltipOnMobile?: boolean
    /**
     * On mobile, a view from seat thumbnail is displayed on the top left of the screen. Tapping this image will expand the thumbnail. You can hide this thumbnail on mobile by passing `showViewFromYourSeatOnMobile: false`.
     * @default true
     */
    showViewFromYourSeatOnMobile?: boolean
    /**
     * On desktop, a view from seat is displayed inside the tooltip when hovering a seat. You can hide this picture on desktop by passing `showViewFromYourSeatOnDesktop: false`.
     * @default true
     */
    showViewFromYourSeatOnDesktop?: boolean
    /**
     * Used to enable or disable the category filter GUI, as well as configuring certain aspects of it. {@link https://docs.seats.io/docs/renderer/categoryfilter See documentation}
     */
    categoryFilter?: CategoryFilter
    /**
     * Makes the specified categories available from selection, while making all others unavailable from selection. The array can be a list of category IDs or labels.
     */
    availableCategories?: CategoryKey[]
    /**
     * Makes the specified categories unavailable from selection. The array can be a list of category IDs or labels.
     */
    unavailableCategories?: CategoryKey[]
    /**
     * Leaves the specified categories normally visible, while making all others dimmed out. The array can be a list of category IDs or labels.
     */
    filteredCategories?: CategoryKey[]
    objectColor?: (object: SelectableObjectProps, defaultColor: string, extraConfig: ExtraConfig) => string
    objectLabel?: (object: SelectableObjectProps, defaultLabel: string, extraConfig: ExtraConfig) => string
    /**
     * @param object
     * @param defaultIcon
     * @param extraConfig
     * @returns A string with the name of a FontAwesome v4.7.0 icon. {@link https://fontawesome.com/v4.7.0/icons/ See the full list of available icons}.
     * For more details, {@link https://docs.seats.io/docs/renderer/config-objecticon see the documentation}.
     */
    objectIcon?: (object: SelectableObjectProps, defaultIcon: string | null, extraConfig?: ExtraConfig) => string
    sectionColor?: (section: SectionProps, defaultColor: string, extraConfig: ExtraConfig) => string
    /**
     * This setting allows you specify when section contents (rows of seats, tables, etc) should be shown. Only available on charts with sections. {@link https://docs.seats.io/docs/renderer/config-showsectioncontents See documentation}
     * @default 'always'
     */
    showSectionContents?: 'always' | 'auto' | 'onlyAfterZoom'
    /**
     * A function that should return true if an object is visible, and false otherwise. When an object is invisible, it can't be selected or interacted with. {@link https://docs.seats.io/docs/renderer/config-isobjectvisible See documentation}
     */
    isObjectVisible?: (object: SelectableObjectProps, extraConfig: ExtraConfig) => boolean
    /**
     * Set to true to show seat labels in your chart.
     * @deault false
     */
    showSeatLabels?: boolean
    /**
     * Start a session to temporarily hold objects upon selection. {@link https://docs.seats.io/docs/renderer/config-session See documentation} for more details.
     * @default 'none'
     */
    session?: Session
    /**
     * Hold tokens allows the chart renderer to re-select already selected seats after a page refresh. {@link https://docs.seats.io/docs/renderer/config-holdtoken See documentation} for more details.
     */
    holdToken?: string
    /**
     * The name of the hidden input field that contains the hold token. Only makes sense when a session is active. {@link https://docs.seats.io/docs/renderer/config-holdtokeninputname See documentation}
     */
    holdTokenInputName?: string
    holdOnSelectForGAs?: boolean
    /**
     * When zoomed in on a chart with sections, a minimap is shown so ticket buyers have a better sense which seats they're looking at. Set to false to hide it.
     * @default true
     */
    showMinimap?: boolean
    /**
     * Whether to show the full screen button or not. For accounts created prior to September 11th 2019, please see the {@link https://docs.seats.io/docs/renderer/config-showfullscreenbutton documentation}.
     * @default true
     */
    showFullScreenButton?: boolean
    /**
     * If true, a legend with the category names and colors is rendered at the top of the chart.
     * @default false
     */
    showLegend?: boolean
    legend?: Legend
    /**
     * Set to false to hide the zoom out button on mobile devices.
     * @default true
     */
    showZoomOutButtonOnMobile?: boolean
    /**
     * Specifies the type of input device to optimize the user interface for. See the {@link https://docs.seats.io/docs/renderer/inputdevice documentation} for more information.
     */
    inputDevice?: 'cursor' | 'touch' | 'auto'
    /**
     * This parameter allows you to override the default seats.io spinner that is shown while the floor plan is being loaded. The value can contain (valid) html.
     */
    loading?: string
    /**
     * Sets the color scheme for the user interface. The colors of certain floor plan elements, such as zoomed-in sections, will also be adjusted accordingly.
     */
    colorScheme?: 'light' | 'dark'
    /**
     * Replaces certain colors of the current color scheme. {@link https://docs.seats.io/docs/renderer/colors See documentation}
     */
    colors?: {
        colorSelected?: string
        cursorTooltipBackgroundColor?: string
        colorTitle?: string
    }
    /**
     * Sets the preset of styles to use for the seating chart user interface. {@link https://docs.seats.io/docs/renderer/stylepreset See documentation}
     */
    stylePreset?: 'balance' | 'bubblegum' | 'flathead' | 'bezels' | 'leaf'
    /**
     * Sets the intention for certain style properties, allowing to override the current style preset. {@link https://docs.seats.io/docs/renderer/style See documentation}
     */
    style?: StyleOverride
    /**
     * Determines how the chart will fit within its parent container. See the {@link https://docs.seats.io/docs/renderer/config-fitto documentation} for more information on this setting.
     */
    fitTo?: 'widthAndHeight' | 'width'
    /**
     * This setting should only be used for accounts created before May 15th 2019. See the {@link https://docs.seats.io/docs/renderer/config-unifiedobjectpropertiesincallbacks documentation} for more details.
     * @deprecated
     */
    unifiedObjectPropertiesInCallbacks?: boolean
    /**
     * Sets the language for built-in texts in seats.io. For more details see {@link https://support.seats.io/en/articles/2074430-translating-embedded-floor-plans-i18n Translating embedded floor plans (I18N)}.
     * @default 'en'
     */
    language?: Language
    /**
     * Allows overriding build-in strings with your own translations. For more information, see {@link http://support.seats.io/integrating-seats-io/multi-language-i18n-support this page}.
     */
    messages?: ChartRendererStrings
    /**
     * The keys of the channels you wish to make selectable. Objects that have no channel assigned, or that have a channel assigned whose key is not in this list, will not be selectable. However, by passing in NO_CHANNEL as channel key, objects without channel become selectable.
     * You cannot supply an empty array: the channels array needs to be either undefined, or an array of at least one element.
     */
    channels?: string[]
}

export type ExtractedEventManagerProps = Pick<ChartRendererConfigOptions,
    | 'colors'
    | 'colorScheme'
    | 'extraConfig'
    | 'fitTo'
    | 'objectColor'
    | 'showFullScreenButton'
    | 'style'
    | 'stylePreset'
    | 'tooltipInfo'
    // Deprecated
    | 'themePreset'
    | 'themeColors'
>


interface BaseEventManagerConfigOptions extends CommonConfigOptions, ExtractedEventManagerProps, EventManagerCallbacks {
    mode: EventManagerMode
    /**
     * The secret key of a workspace.
     * WARNING: Never expose this key on a public web page. It should only be used behind a login wall.
     */
    secretKey: string
    /**
     * Supported languages:
     * - `'nl'` - Dutch
     * - `'en'` - English
     * - `'de'` – German
     * - `'pt'` – Portuguese
     * - `'es'` – Spanish
     * - `'fr'` – French'
     *
     * @default `'en'`
     */
    language?: 'de' | 'en' | 'es' | 'fr' | 'nl' | 'pt'
    /**
     * Allows to toggle on or off some features of the cursor tooltip, displayed when hovering objects when using pointing devices like a mouse, or when tapping on an object on touch devices.
     */
    messages?: EventAndChartManagerStrings
    objectTooltip?: {
        /**
         * Show the orderId in the tooltip if present.
         * @default true
         */
        showOrderId?: boolean
        /**
         * Show the technical label, if one of the label components was overridden via the Displayed Label field in Designer.
         * @default false
         */
        showTechnicalLabel?: boolean
    }
    viewSettingsDefaults?: {
        /**
         * @default false
         */
        showSeatLabels?: boolean
        /**
         * @default false
         */
        showRowLabels?: boolean
        /**
         * Use channel colors (true) or category colors (false). Only available in select and static modes
         * @default false
         */
        useChannelColors?: boolean
    }
}

interface EventManagerManageObjectStatusesModeConfigOptions extends BaseEventManagerConfigOptions, WithEvents {
    mode: 'manageObjectStatuses'
    session?: Session
}

interface EventManagerManageChannelsModeConfigOptions extends BaseEventManagerConfigOptions, WithEvent {
    mode: 'manageChannels'
    manageChannelsList?: boolean
    unavailableObjectsSelectable?: boolean
}

interface EventManagerManageCategoriesModeConfigOptions extends BaseEventManagerConfigOptions, WithEvent {
    mode: 'manageCategories'
    unavailableObjectsSelectable?: boolean
}

interface EventManagerFilterSectionsModeConfigOptions extends BaseEventManagerConfigOptions, WithEvent {
    mode: 'filterSections'
    onFilteredSectionChange: (sectionLabels: string[]) => {}
}


interface EventManagerSelectModeConfigOptions extends BaseEventManagerConfigOptions, WithEvents {
    mode: 'select'
    maxSelectedObjects?: SelectionLimiter
    numberOfPlacesToSelect?: number
    selectedObjects?: (string | SelectedObject | SelectedGA)[]
    selectionBy?: 'places' | 'objects'
    ticketTypes?: TicketTypeJsonWithoutPrice[]
    tooltipContents?: (object: object) => string
    unavailableObjectsSelectable?: boolean
    selectableObjects?: string[]
}

interface EventManagerStaticModeConfigOptions extends BaseEventManagerConfigOptions, WithEvents {
    mode: 'static'
    onObjectMouseOver?: (object: SelectableObjectProps) => void
    onObjectMouseOut?: (object: SelectableObjectProps) => void
    tooltipContents?: (object: object) => string
}

export type EventManagerConfigOptions =
    | EventManagerManageObjectStatusesModeConfigOptions
    | EventManagerManageChannelsModeConfigOptions
    | EventManagerManageCategoriesModeConfigOptions
    | EventManagerSelectModeConfigOptions
    | EventManagerFilterSectionsModeConfigOptions
    | EventManagerStaticModeConfigOptions
    | (BaseEventManagerConfigOptions & WithEvent)

export interface ChartDesignerConfigOptions {
    canvasColorScheme?: 'auto' | 'light' | 'dark'
    chartKey?: string
    container?: Element
    divId?: string
    /**
     * Documentation: {@link https://docs.seats.io/docs/embedded-designer/configuration-features}
     */
    features?: {
        disabled?: (keyof ChartDesignerFeatures)[]
        enabled?: (keyof ChartDesignerFeatures)[]
        readOnly?: ('chartName' | 'categoryList')[]
    },
    /**
     * Documentation: {@link https://docs.seats.io/docs/embedded-designer/configuration-language}
     */
    language?: 'de' | 'en' | 'es' | 'fr' | 'pt'
    mode?: 'normal' | 'safe' | 'readOnly',
    onChartCreated?: (chartKey: string) => void
    onChartPublished?: (chartKey: string) => void
    onChartUpdated?: (chartKey: string) => void
    onDesignerRendered?: (designer: ChartDesigner) => void
    onDesignerRenderingFailed?: (designer: ChartDesigner) => void
    onExitRequested?: () => void
    openDraftDrawing?: boolean
    openLatestDrawing?: boolean
    secretKey: string
}

export interface ChartDesignerFeatures {
    'tables.bookAsAWhole'?: boolean
    areas?: boolean
    backgroundImage?: boolean
    booths?: boolean
    categoryList?: boolean
    contextActions?: boolean
    firstTimeTutorial?: boolean
    focalPoint?: boolean
    icons?: boolean
    images?: boolean
    labeling?: boolean
    nodes?: boolean
    objectProperties?: boolean
    publishedSectionLabel?: boolean
    publishing?: boolean
    referenceChart?: boolean
    rows?: boolean
    sections?: boolean
    shapes?: boolean
    tables?: boolean
    texts?: boolean
    viewFromYourSeat?: boolean
}

export interface ChartDesigner extends Pick<SeatingChart, | 'render' | 'destroy'> {
}

export type ConfigChange = Pick<
    ChartRendererConfigOptions,
    | 'availableCategories'
    | 'channels'
    | 'extraConfig'
    | 'filteredCategories'
    | 'maxSelectedObjects'
    | 'numberOfPlacesToSelect'
    | 'objectColor'
    | 'objectLabel'
    | 'pricing'
    | 'unavailableCategories'
>

type ChartRendererBuiltInStrings = { [key in ChartRendererStringKey]: string }
type EventAndChartManagerBuiltInStrings = { [key in EventAndChartManagerStringKey]: string }

export type AnyString<T> = T & { [key: string]: string }
export type LiteralUnion<T extends string> = T | {};
export type ChartRendererStrings = AnyString<Partial<ChartRendererBuiltInStrings>>
export type EventAndChartManagerStrings = AnyString<Partial<EventAndChartManagerBuiltInStrings>>

export type ChartRendererStringKey =
    | 'accessible'
    | 'and'
    | 'available.places'
    | 'available.seats'
    | 'bar'
    | 'bench'
    | 'cancel'
    | 'chair'
    | 'choosePriceLevel'
    | 'choosePriceLevels'
    | 'chooseTickets'
    | 'clickToDeselect'
    | 'clickToDeselectPlaces'
    | 'clickToFilterCategories'
    | 'clickToSelect'
    | 'clickToSelectPlaces'
    | 'close'
    | 'closeFullScreen'
    | 'companionSeat'
    | 'confirm'
    | 'couch'
    | 'deselect'
    | 'deselectOthersFirst'
    | 'disabledBySocialDistancing'
    | 'done'
    | 'holdFailedModalBodyBecauseBadRequest'
    | 'holdFailedModalBodyBecauseNetworkIssue'
    | 'holdFailedModalBodyBecauseOther'
    | 'holdReleaseFailedModalBodyBecauseBadRequest'
    | 'holdReleaseFailedModalBodyBecauseNetworkIssue'
    | 'holdReleaseFailedModalBodyBecauseOther'
    | 'maxSelectionReached'
    | 'maxSelectionReachedWithNumber'
    | 'moreExtraCategories'
    | 'multipleTicketsAvailableInSection'
    | 'noLongerAvailable'
    | 'noOrphanSeats'
    | 'noSocialDistancingOrphanSeats'
    | 'notAvailable'
    | 'notEnoughPlacesAvailable'
    | 'notEnoughPlacesToSelectLeft'
    | 'openFullScreen'
    | 'pickCategory'
    | 'renderingFailed'
    | 'restrictedView'
    | 'row'
    | 'seat'
    | 'seats'
    | 'section'
    | 'sectionAvailability.none'
    | 'select-lasso'
    | 'select-rectangle'
    | 'select'
    | 'selected'
    | 'selectionToolsHintDeselect'
    | 'selectMorePlaces'
    | 'selectQuantity'
    | 'sessionExpired'
    | 'sessionExpiredAllPlacesReleased'
    | 'sessionExpiredStartOver'
    | 'singlePlaceToSelectLeft'
    | 'singleTicketAvailableInSection'
    | 'stool'
    | 'table'
    | 'tapToFilterCategories'
    | 'ticketsAvailableFrom'
    | 'unavailablePlace'
    | 'useMetaKeyToZoom'
    | 'willBeDisabledBySocialDistancing'
    | 'x.places'
    | 'x.to.y.places'

export type EventAndChartManagerStringKey =
    | 'allPlacesAvailable'
    | 'allTablesWillBeBookableBySeat'
    | 'allTablesWillBeBookableByTable'
    | 'anEventInSeasonChannelForEvent'
    | 'anEventInSeasonChannelForPartialSeason'
    | 'anEventInSeasonChannelForTopLevelSeason'
    | 'applyChanges'
    | 'assignedToChannelInSeasonEvent'
    | 'assignedToChannelInSeasonPartialSeason'
    | 'assignedToChannelInSeasonTopLevelSeason'
    | 'book'
    | 'bookableBySeat'
    | 'bookableByTable'
    | 'bookBySeatsOnly'
    | 'bookByTablesOnly'
    | 'booked'
    | 'bookNumPlaces'
    | 'cannotBeMarkedAs'
    | 'cantManuallyEnableAndDisableSameSeat'
    | 'change'
    | 'channelName'
    | 'channels'
    | 'clickToBook'
    | 'clickToChange'
    | 'clickToDisableSeats'
    | 'clickToEnableSeats'
    | 'clickToMarkAs'
    | 'clickToRelease'
    | 'clickToTestRules'
    | 'clickToUndo'
    | 'close'
    | 'confirmAllBookableBySeat'
    | 'confirmAllBookableByTable'
    | 'confirmBookSocialDistancingBody'
    | 'confirmBookSocialDistancingConfirmButton'
    | 'confirmBookSocialDistancingTitle'
    | 'confirmDeleteRuleset'
    | 'confirmLeaveChangesWillBeLost'
    | 'confirmResetObjectCategories'
    | 'confirmResetTableBookingModes'
    | 'confirmUnassignAndRemoveChannel'
    | 'createChannel'
    | 'createRuleset'
    | 'defaultChannel'
    | 'defaultChannelHint'
    | 'delete'
    | 'disable'
    | 'disabledByRules'
    | 'disableDiagonalSeatsInFrontAndBehind'
    | 'disabledSeat'
    | 'disabledSeats'
    | 'disableSeats'
    | 'disableSeatsInFrontAndBehind'
    | 'done'
    | 'duplicate'
    | 'editRules'
    | 'enable'
    | 'enableMaxGroupSizeHint'
    | 'entirelyForSale'
    | 'entirelyNotForSale'
    | 'extraPlace'
    | 'extraPlaces'
    | 'fixedSocialDistancingGroupLayout'
    | 'fixedSocialDistancingGroupLayoutHint1'
    | 'fixedSocialDistancingGroupLayoutHint2'
    | 'forSale'
    | 'forSaleWillNotConsumeSaveMessage'
    | 'free'
    | 'goBack'
    | 'manage'
    | 'manageChannels'
    | 'manuallyDisabled'
    | 'manuallyDisabledSeat'
    | 'manuallyDisabledSeats'
    | 'manuallyDisableSeats'
    | 'manuallyEnabledOverRules'
    | 'manuallyEnabledSeat'
    | 'manuallyEnabledSeats'
    | 'manuallyEnableSeats'
    | 'markAs'
    | 'markNumObjectsAs'
    | 'markNumPlacesAsNotForSale'
    | 'maxGroupSize'
    | 'maxOccupancy'
    | 'maxOccupancyPlaces'
    | 'noCategory'
    | 'noChannel'
    | 'noChannelsCreated'
    | 'noPlacesAvailable'
    | 'noSeasonChannelsCreated'
    | 'notForSale'
    | 'notForSaleInSeason'
    | 'notForSaleWillConsumeSaveMessage'
    | 'numberOfDisabledAisleSeats'
    | 'numberOfDisabledSeatsToTheSides'
    | 'numberOfPlacesNotForSaleError'
    | 'numExtraPlacesWillBeBooked'
    | 'numObjectsMarkedAs'
    | 'numPlacesBooked'
    | 'numPlacesNotForSale'
    | 'numPlacesWillBeReleased'
    | 'numSavesForSaleRemaining'
    | 'numSavesNotForSaleRemaining'
    | 'numWillBeBookableBySeat'
    | 'numWillBeBookableByTable'
    | 'object'
    | 'objectFoundLabel'
    | 'objects'
    | 'objectWillBeBooked'
    | 'objectWillBeReleased'
    | 'oneGroupPerTable'
    | 'oneGroupPerTableHint'
    | 'place'
    | 'places'
    | 'placesBooked'
    | 'placesNotForSale'
    | 'placesUnavailable'
    | 'pressToFocus'
    | 'pressToFocusWithinFloor'
    | 'release'
    | 'releaseNumPlaces'
    | 'reservedByToken'
    | 'resetToDefaultCategory'
    | 'resetToDefaults_help_categories'
    | 'resetToDefaults_help_makeAllBookBySeat'
    | 'resetToDefaults_help_makeAllBookByTable'
    | 'resetToDefaults_help'
    | 'resetToDefaults'
    | 'ruleBasedSocialDistancingGroupLayout'
    | 'ruleBasedSocialDistancingGroupLayoutHint'
    | 'rulesetName'
    | 'rulesetX'
    | 'save'
    | 'savedTooManyTimes'
    | 'saves'
    | 'searchByObjectLabel'
    | 'seasonBooked'
    | 'seasonBookedInCurrentEvent'
    | 'seasonBookedInCurrentSeason'
    | 'seasonBookedInEvents'
    | 'seasonCategoriesNotEditableNotice'
    | 'seasonChannelsNotEditableNotice'
    | 'seasonTableBookingModeNotEditableNotice'
    | 'seasonUnavailableFromEventBookings'
    | 'seat_booked_table_unavailable'
    | 'selectMode'
    | 'selectWholeRow'
    | 'serverFailCheckInternet'
    | 'showRowLabels'
    | 'showSeatLabels'
    | 'socialDistancingGroupLayoutType'
    | 'socialDistancingRulesets'
    | 'somethingWentWrong'
    | 'success'
    | 'table_booked_seats_unavailable'
    | 'table'
    | 'tableBookingModeAllBySeat'
    | 'tableBookingModeAllByTable'
    | 'tableBookingModeCustom'
    | 'tableBookingModeInherit'
    | 'tables'
    | 'thisIsAPreview'
    | 'undo'
    | 'useChannelColors'
    | 'willBeBookableBySeat'
    | 'willBeBookableByTable'
    | 'willBeMarkedAs'
    | 'xMore'
    | 'xObjectsFound'

export type ChartRendererCallbacks = {
    onChartRendered?: (chart: SeatingChart) => void
    onChartRenderingFailed?: (chart: SeatingChart) => void
    onChartRerenderingStarted?: (chart: SeatingChart) => void
    onFilteredCategoriesChanged?: (categories: Category[]) => void
    onFloorChanged?: (floor?: Floor) => void
    onFullScreenClosed?: () => void
    onFullScreenOpened?: () => void
    onHoldFailed?: (objects: BookableObjectProps[], ticketTypes: TicketTypeJson[]) => void
    onHoldSucceeded?: (objects: BookableObjectProps[], ticketTypes: TicketTypeJson[]) => void
    onHoldTokenExpired?: () => void
    onObjectClicked?: (object: SelectableObjectProps) => void
    onObjectDeselected?: (object: BookableObjectProps, selectedTicketType: TicketTypeJson) => void
    onObjectMouseOut?: (object: SelectableObjectProps) => void
    onObjectMouseOver?: (object: SelectableObjectProps) => void
    onObjectSelected?: (object: SelectableObjectProps, selectedTicketType: TicketTypeJson) => void
    onObjectStatusChanged?: (object: BookableObjectProps) => void
    onReleaseHoldFailed?: (objects: BookableObjectProps[], ticketTypes: TicketTypeJson[]) => void
    onReleaseHoldSucceeded?: (objects: BookableObjectProps[], ticketTypes: TicketTypeJson[]) => void
    onSelectedObjectBooked?: (object: BookableObjectProps) => void
    onSelectionInvalid?: (violations: string[]) => void
    onSelectionValid?: () => void
    onSessionInitialized?: (holdToken: HoldToken) => void
}

export type EventManagerCallbacks =
    Pick<ChartRendererCallbacks, 'onObjectSelected' | 'onObjectDeselected' | 'onObjectClicked' | 'onFullScreenOpened' | 'onFullScreenClosed'>
    & {
    onChartRendered?: (chart: EventManager) => void
    onChartRenderingFailed?: (chart: EventManager) => void
    onChartRerenderingStarted?: (chart: EventManager) => void
    onSubmitFailed?: () => void
    onSubmitSucceeded?: () => void
}

export interface Legend {
    /**
     * Set this property to true to hide non selectable categories in the legend. A non selectable category is a category for which there are no selectable objects on the chart.
     * By default, even categories without selectable objects are shown in the legend.
     * @default false
     */
    hideNonSelectableCategories?: boolean
    /**
     * Set this property to true to hide the gray "Not Available" item in the legend.
     * @default false
     */
    hideUnavailableLegendItem?: boolean
    /**
     * Set this property to true to only show category labels in the legend, without pricing information. Cannot be used in combination with `legend.hideCategoryName: true`.
     * @default false
     */
    hidePricing?: boolean
    /**
     * Set this property to true to only show pricing information in the legend, without the category name. Cannot be used in combination with `legend.hidePricing: true`.
     * @default false
     */
    hideCategoryName?: boolean
}

export type Region = 'eu' | 'na' | 'sa' | 'oc'

export type Floor = {
    name: string,
    categories?: Category[]
}

export type Category = {
    accessible: boolean
    color: string
    key: number
    label: string
    pricing: { price: number, formattedPrice: string },
    hasSelectableObjects: boolean
}

export type HoldToken = {
    token: string,
    expiresAt: string,
    expiresInSeconds: number
}

export type StyleOverride = {
    font?: 'Roboto' | 'Montserrat' | 'WorkSans' | 'NotoSansHK' | 'Lato' | 'NunitoSans'
    fontWeight?: 'bolder' | 'minMax'
    borderRadius?: 'none' | 'max' | 'asymmetrical'
    border?: '3d' | 'thick'
    padding?: 'spacious'
    buttonFace: 'fillEnabled' | 'fillHighlightedOption'
}

export type ExtraConfig = Dict<any>

export type SelectionLimiter =
    number
    | (TotalLimiter | TicketTypeLimiter | CategoryLimiter | CategoryAndTicketLimiter)[]

export type TotalLimiter = {
    total: number
}

export type TicketTypeLimiter = {
    ticketType: string
    quantity: number
}

export type CategoryLimiter = {
    category: CategoryKey
    quantity: number
}

export type CategoryAndTicketLimiter = {
    category: string
    ticketTypes: TicketTypeLimiter[]
}

export interface ChartRendererObjectTooltip {
    /**
     * If true, a "Click to select" or "Click to deselect" message will be displayed on bookable objects when selection is allowed.
     * @default true
     */
    showActionHint?: boolean
    /**
     * If true, the amount of available seats of the section or general admission will be displayed.
     * @default false
     */
    showAvailability?: boolean
    /**
     * If true, the object's category color and name will be displayed.
     * @default true
     */
    showCategory?: boolean
    /**
     * If true, the section name, row number and/or seat number of the object will be visible. If false, no labeling will be shown.
     * @default true
     */
    showLabel?: boolean
    /**
     * If true, the price range of the object's category will be visible.
     * @default true
     */
    showPricing?: boolean
    /**
     * If true, a notice will be displayed on the tooltip if the object is unavailable.
     * @default true
     */
    showUnavailableNotice?: boolean
    /**
     * If true, a labels will be displayed in a hierarchy-based styling, improving readability. If false, labels will be displayed as flat text.
     * @default true
     */
    stylizedLabel?: boolean
    /**
     * If true, a popup will show up when selecting an object on mobile containing the same information as the desktop tooltip, seen on hover. A button must be pressed to confirm the selection. If false, selection is done instantly but no information regarding the object is shown to the user. If unset, it will automatically attempt to show it unless an onObjectClicked parameter is passed in.
     * @default auto
     */
    confirmSelectionOnMobile?: boolean | 'auto'
}

export type Language =
    | 'ar'
    | 'be'
    | 'bg'
    | 'ca'
    | 'cs'
    | 'cy'
    | 'da'
    | 'de'
    | 'el'
    | 'en'
    | 'es'
    | 'et'
    | 'fa'
    | 'fi'
    | 'fr'
    | 'hr'
    | 'he'
    | 'hu'
    | 'it'
    | 'ja'
    | 'ku'
    | 'li'
    | 'lv'
    | 'no'
    | 'nl'
    | 'pl'
    | 'pt'
    | 'ro'
    | 'ru'
    | 'sk'
    | 'sl'
    | 'sr'
    | 'sv'
    | 'tr'
    | 'uk'
    | 'zh-Hans'
    | 'zh-Hant'

export type CategoryFilter = {
    /**
     * If true, the category filter will be visible.
     * @default false
     */
    enabled?: boolean
    /**
     * If true, multiple categories can be selected at once.
     * @default true
     */
    multiSelect?: boolean
    /**
     * If true, the chart will zoom in or out to fit in the viewport the filtered objects.
     * @default false
     */
    zoomOnSelect?: boolean
}

// Deprecated config values
export type DeprecatedConfigProperties = {
    /**
     * @deprecated Use `selectionValidators` instead. Read more at {@link https://docs.seats.io/docs/renderer-config-selectionvalidators}
     */
    allowOrphanSeats?: boolean
    /**
     * @deprecated Use `selectionValidators` instead. Read more at {@link https://docs.seats.io/docs/renderer-config-selectionvalidators}
     */
    orphanSeats?: string
    /**
     * @deprecated Use `tooltipInfo` instead. Read more at {@link https://docs.seats.io/docs/renderer-config-tooltipinfo}
     */
    customTooltipText?: boolean
    /**
     * @deprecated Use `colorScheme`, `colors`, `stylePreset` and `style` instead. Read more at {@link https://docs.seats.io/docs/renderer-style-your-floor-plan}
     */
    tooltipStyle?: string
    /**
     * @deprecated
     */
    isObjectSelectable?: Function
    /**
     * @deprecated Use {@link https://docs.seats.io/docs/renderer-config-objectcategories objectCategories} instead.
     */
    objectCategory?: Function
    /**
     * @deprecated Use the chart designer to indicate which row labels are shown.
     */
    showRowLabels?: boolean
    /**
     * @deprecated Use {@link https://docs.seats.io/docs/renderer/colorscheme/ colorScheme} instead.
     */
    themePreset?: string
    /**
     * @deprecated Use {@link https://docs.seats.io/docs/renderer/colors/ colors} instead.
     */
    themeColors?: any
    /**
     * @deprecated Seats.io now uses native scrolling - no need to implement `onScrolledOutOfBoundsVertically` anymore.
     */
    onScrolledOutOfBoundsVertically?: () => void
    /**
     * @deprecated Use {@link https://docs.seats.io/docs/renderer-config-session session} instead.
     */
    holdOnSelect?: boolean
    /**
     * @deprecated Use `showSectionContents: "always"` instead.
     */
    alwaysShowSectionContents?: boolean
    /**
     * @deprecated
     */
    showRowLines?: boolean
}

export type ChartRendererMode = 'normal' | 'print' | 'spotlight' | 'static'

export type EventManagerMode =
    | 'filterSections'
    | 'manageCategories'
    | 'manageChannels'
    | 'manageForSaleConfig'
    | 'manageObjectStatuses'
    | 'manageTableBooking'
    | 'select'
    | 'static'

export type SimplePricing = {
    category: CategoryKey
    originalPrice?: number
    price: number
}

export type MultiLevelPricing = {
    category: number | string,
    ticketTypes: TicketType[]
}

export type TicketType = {
    ticketType: string
    originalPrice?: number
    price: number
    label?: string,
    description?: string
}

export type Pricing = (SimplePricing | MultiLevelPricing)[]

export type SelectionValidator =
    SelectionValidatorNoOrphanSeats
    | SelectionValidatorConsecutiveSeats
    | SelectionValidatorMinimumSelectedPlaces

interface SelectionValidatorNoOrphanSeats {
    type: 'noOrphanSeats'
    mode?: 'strict' | 'lenient'
    highlight?: boolean
}

interface SelectionValidatorConsecutiveSeats {
    type: 'consecutiveSeats'
}

interface SelectionValidatorMinimumSelectedPlaces {
    type: 'minimumSelectedPlaces'
    minimum: number
}

export interface SelectedObject {
    label: string
    ticketType: string
}

export interface SelectedGA {
    label: string
    amount: number
}

export interface CategoryToJSON {
    label: string
    color: string
    accessible: boolean
    key: CategoryKey
    pricing: PricingJson | null
    isFiltered: boolean
    hasSelectableObjects?: boolean
}

export interface PricingJson {
    price?: PriceType
    formattedPrice?: PriceType
    ticketTypes?: TicketTypeJsonForPricing[]
}

interface TicketTypeJsonForPricing {
    ticketType?: string
    price?: PriceType
    label?: string
    formattedPrice?: PriceType
}

interface TicketTypeJsonWithoutPrice {
    ticketType?: string
    label?: string
    description?: string
}

export interface TicketTypeJson {
    ticketType: string
    price: number
    originalPrice?: number,
    label?: string
    description?: string
    formattedPrice: string
    formattedOriginalPrice?: string
}

interface Labels {
    own: string
    displayedLabel: string
    parent?: string
    section?: string
}

export type PriceType = number | string

export interface InteractiveObjectProps {
    readonly label: string
    readonly labels: Labels
}

export interface NonBookableTableProps extends InteractiveObjectProps {
    readonly seats: SeatProps[]
    readonly center: { x: number; y: number }
    readonly category?: CategoryToJSON
}

export interface NonBookableTableSeatProps extends InteractiveObjectProps {
    readonly center: { x: number; y: number }
    readonly restrictedView: boolean
    readonly companionSeat: boolean
    readonly accessible: boolean
    readonly parent: { type: 'row' | 'table' }
}

export interface SelectableObjectProps extends InteractiveObjectProps {
    readonly objectType: string
    readonly selected: boolean
    readonly selectedTicketType: string | undefined
    readonly accessible: boolean | undefined
    readonly restrictedView: boolean | undefined
    readonly companionSeat: boolean | undefined
    readonly displayObjectType: string | undefined
    readonly category?: CategoryToJSON
    readonly pricing: PricingJson
    readonly selectable?: boolean

    select: (ticketType?: string) => Promise<void>
    deselect: (ticketType?: string) => Promise<void>
}

export interface SectionProps extends InteractiveObjectProps {
    readonly objectType: string
    readonly numberOfSelectableObjects: number
    readonly numberOfSelectedObjects: number
    readonly selectableCategories: CategoryKey[]
    readonly entrance: string | null
    readonly isInteractive: boolean
    readonly sectionCategory?: CategoryToJSON
}

export interface InteractiveSectionProps extends SelectableObjectProps {
    readonly ticketListing: ListingBySection
}

export interface BookableObjectProps extends SelectableObjectProps {
    /**
     * Set to one of the predefined values `free`, `reservedByToken`, `booked` or use a custom status.
     */
    readonly status: LiteralUnion<'booked' | 'free' | 'reservedByToken'>
    readonly extraData: {} | undefined
    readonly forSale: boolean
    readonly dataPerEvent: Dict<object>

    // renderer properties
    inSelectableChannel?: boolean
    hashedChannelKey?: string
    isInChannel?: (channelKey: string) => boolean

    /**
     * Only available in the Event Manager
     */
    channel?: Channel
}

export interface SeatProps extends BookableObjectProps {
    readonly center: { x: number; y: number }
    readonly isOrphan: boolean
    readonly viewFromSeatUrl?: string
    readonly parent: { type: 'row' | 'table' }

    pulse: () => Promise<void>
    unpulse: () => Promise<void>
}

export interface BoothProps extends BookableObjectProps {
    readonly objectType: 'Booth'
}

export interface TableProps extends BookableObjectProps {
    readonly seats: NonBookableTableSeatProps[]
    readonly center: { x: number; y: number }
}

export interface GeneralAdmissionAreaProps extends BookableObjectProps {
    readonly numBooked: number
    readonly capacity: number
    readonly numFree: number
    readonly numSelected: number
    readonly selectionPerTicketType: Dict<number>
    readonly holds: Dict<Dict<number>>
    readonly dataPerEvent: Dict<object>
    readonly entrance: string | null
    readonly bookAsAWhole: boolean
}

export interface SeatingChart {
    changeConfig: (config: ConfigChange) => Promise<void>
    clearSelection: () => Promise<void>
    deselectCategories: (categoryIds: string[]) => Promise<void>
    deselectObjects: (objects: string[] | Selection[]) => Promise<void>
    destroy: () => void
    findObject: (label: string) => Promise<SelectableObjectProps>
    getReportBySelectability: () => Promise<Object>
    holdToken: string
    listCategories: () => Promise<Category[]>
    listSelectedObjects: () => Promise<(any)[]>
    render: () => SeatingChart
    rerender: () => void
    resetView: () => Promise<void>
    selectCategories: (categoryIds: string[]) => Promise<void>
    selectedObjects: string[]
    selectObjects: (objects: string [] | Selection[]) => Promise<void>
    pulse: (objects: string []) => Promise<void>
    unpulse: (objects: string []) => Promise<void>
    startNewSession: () => Promise<void>
    zoomToFilteredCategories: () => Promise<void>
    zoomToSection: (label: string) => SectionProps[],
    zoomToObjects: (labels: string[]) => Promise<void>
    zoomToSelectedObjects: () => Promise<void>
}

export interface EventManager extends Pick<SeatingChart,
    | 'clearSelection'
    | 'deselectCategories'
    | 'deselectObjects'
    | 'destroy'
    | 'findObject'
    | 'listCategories'
    | 'listSelectedObjects'
    | 'render'
    | 'rerender'
    | 'resetView'
    | 'selectCategories'
    | 'selectObjects'
    | 'zoomToObjects'
    | 'zoomToSection'
    | 'zoomToSelectedObjects'
    | 'pulse'
    | 'unpulse'
> {
    setHighlightedObjects(strings: string[]): void
    clearHighlightedObjects(): void
    setFilteredSection(label: string): void
    clearFilteredSection(): void
}

export interface Channel {
    name: string
    key: string
    color: string
    index: number
}

export type Selection = {
    id: string
    ticketType?: string
    amount?: number
}

export type CategoryKey = string | number

export interface Dict<T> {
    [key: string]: T
}

export type ListingBySection = {
    minPrice: number
    quantity: number
}