import {
    ChartDesignerConfigOptions,
    ChartRendererConfigOptions,
    EventManagerConfigOptions,
    EventManagerFilterSectionsModeConfigOptions,
    EventManagerManageCategoriesModeConfigOptions,
    EventManagerManageChannelsModeConfigOptions,
    EventManagerManageObjectStatusesModeConfigOptions,
    EventManagerSelectModeConfigOptions,
    EventManagerStaticModeConfigOptions
} from './index'

// Set up a complete Chart Renderer config
const fullChartRendererConfig: Required<ChartRendererConfigOptions> = {
    activeFloor: '1',
    container: document.body,
    divId: 'chartContainer',
    event: 'myEvent',
    events: ['eventA', 'eventB'],
    mode: 'normal',
    workspaceKey: 'myKey',
    extraConfig: {},
    pricing: [
        { category: 'A', price: 10, originalPrice: 15 },
        { category: 'B', ticketTypes: [
            { ticketType: 'adult', price: 30, label: 'Adults' },
            { ticketType: 'child', price: 20, label: 'Children' },
            { ticketType: 'senior', price: 25, label: 'Senior', description: '65+ – Requires ID' }
        ]}
    ],
    priceFormatter: price => '$' + price,
    showSectionPricingOverlay: true,
    selectedObjects: [
        'A-1',
        {
            label: 'A-2',
            ticketType: 'child',  },
        {
            label: 'General Admission',
            amount: 4
        },
    ],
    selectableObjects: ['A-1', 'A-2'],
    selectionValidators: [
        { type: 'minimumSelectedPlaces', minimum: 4 },
        { type: 'consecutiveSeats' },
        { type: 'noOrphanSeats', highlight: false, mode: 'lenient', ignoreCategories: false}
    ],
    maxSelectedObjects: [
        { ticketType: 'adult', quantity: 2 },
        { ticketType: 'child', quantity: 3 },
        { total: 4 },
        {
            category: "balcony",
            ticketTypes: [
                { ticketType: 'adult', quantity: 1 },
                { ticketType: 'child', quantity: 1 }
            ]
        },
    ],
    numberOfPlacesToSelect: 3,
    multiSelectEnabled: true,
    canGASelectionBeIncreased: (_gaArea, defaultValue, _extraConfig, _ticketType) => defaultValue,
    selectedObjectsInputName: 'inputName',
    objectWithoutPricingSelectable: true,
    objectWithoutCategorySelectable: true,
    objectTooltip: {
        showActionHint: true,
        showAvailability: false,
        showCategory: true,
        showLabel: true,
        showPricing: true,
        showUnavailableNotice: true,
        stylizedLabel: true,
        confirmSelectionOnMobile: 'auto'
    },
    tooltipInfo: object => "[b]This[/b] object's [i]id[/i] is [pre]" + object.label + "[/pre]",
    showActiveSectionTooltipOnMobile: true,
    showViewFromYourSeatOnMobile: true,
    showViewFromYourSeatOnDesktop: true,
    language: 'en',
    messages: {
        chooseTickets: 'Select your tickets'
    },
    categoryFilter: {
        enabled: false,
        multiSelect: true,
        zoomOnSelect: false,
        sortBy: 'none'
    },
    availableCategories: [1, 2, 'Balcony'],
    unavailableCategories: [3, 4, 'Stalls'],
    filteredCategories: ['Stalls'],
    channels: ['0ef73fd9-693c-5073-98ac-d1dd8cd86536', 'NO_CHANNEL'],
    objectColor: (_object, _defaultColor, _extraConfig) => 'red',
    sectionColor: (_object, _defaultColor, _extraConfig) => 'blue',
    objectLabel: (object, _defaultLabel, _extraConfig) => {
        if(object.objectType === 'Seat') {
            return 'I\'m a seat. My parent is a ' + object.parent.type
        }
        return `Object label is ${object.label}`
    },
    objectIcon: (_object, _defaultIcon, _extraConfig) => 'circle',
    showSectionContents: 'onlyAfterZoom',
    isObjectVisible: (_object, _extraConfig) => true,
    showSeatLabels: true,
    session: 'continue',
    holdToken: 'myToken',
    holdTokenInputName: 'myTokenInput',
    holdOnSelectForGAs: true,
    showMinimap: true,
    showFullScreenButton: true,
    legend: {
        hideUnavailableLegendItem: true,
        hideNonSelectableCategories: true,
        hidePricing: true,
        hideCategoryName: true
    },
    showLegend: true,
    showZoomOutButtonOnMobile: true,
    inputDevice: 'auto',
    loading: '<div class="loader">Loading...</div>',
    colorScheme: 'dark',
    colors: {
        colorSelected: 'hsl(214, 96%, 53%)',
        cursorTooltipBackgroundColor: 'hsl(214, 96%, 53%)',
        colorTitle: 'hsl(214, 96%, 53%)',
    },
    stylePreset: 'bubblegum',
    style: {
        border: '3d',
        borderRadius: 'asymmetrical',
        buttonFace: 'fillEnabled',
        font: 'Roboto',
        fontWeight: 'bolder',
        padding: 'spacious'
    },
    fitTo: 'width',
    // Callbacks
    onChartRendered: (_chart) => {},
    onChartRenderingFailed: (_chart) => {},
    onChartRerenderingStarted: (_chart) => {},
    onObjectSelected: (_selectedObject) => {},
    onObjectDeselected: (_deselectedObject) => {},
    onObjectClicked: (_object) => {},
    onFullScreenOpened: () => {},
    onFullScreenClosed: () => {},
    onObjectMouseOver: _object => {},
    onObjectMouseOut: _object => {},
    onObjectStatusChanged: _object => {},
    onSelectedObjectBooked: _object => {},
    onSessionInitialized: _holdToken => { },
    onHoldSucceeded: (_objects, _ticketTypes) => {},
    onHoldFailed: (_objects, _ticketTypes) => {},
    onHoldTokenExpired: () => {},
    onReleaseHoldSucceeded: (_objects, _ticketTypes) => {},
    onReleaseHoldFailed: (_objects, _ticketTypes) => {},
    onSelectionValid: () => {},
    onSelectionInvalid: () => {},
    onFilteredCategoriesChanged: _categories => {},
    onFloorChanged: _floor => {},
    unifiedObjectPropertiesInCallbacks: true,
    // Deprecated
    allowOrphanSeats: false,
    alwaysShowSectionContents: false,
    customTooltipText: false,
    holdOnSelect: false,
    isObjectSelectable: () => true,
    objectCategory: () => {},
    onScrolledOutOfBoundsVertically: () => {},
    orphanSeats: '',
    showRowLabels: false,
    showRowLines: false,
    themeColors: 'someTheme',
    themePreset: 'somePreset',
    tooltipStyle: 'someStyle'
}

// Set up a complete Event Manager config
const fullEventManagerConfig: Required<EventManagerConfigOptions> = {
    divId: 'chartContainer',
    container: document.body,
    colorScheme: "light",
    colors: {
        colorSelected: 'hsl(214, 96%, 53%)',
        colorTitle: 'hsl(214, 96%, 53%)',
        cursorTooltipBackgroundColor: 'hsl(214, 96%, 53%)'
    },
    stylePreset: 'bubblegum',
    style: {
        border: '3d',
        borderRadius: 'asymmetrical',
        buttonFace: 'fillEnabled',
        font: 'Roboto',
        fontWeight: 'bolder',
        padding: 'spacious'
    },
    event: 'myEvent',
    language: 'de',
    messages: {
        allPlacesAvailable: 'All free',
        myCustomString: 'This is a custom string'
    },
    mode: 'manageObjectStatuses',
    objectTooltip: {
        showOrderId: true,
        showTechnicalLabel: false
    },
    secretKey: 'mySecretKey',
    viewSettingsDefaults: {
        showRowLabels: true,
        showSeatLabels: true,
        useChannelColors: true
    },
    tooltipInfo: object => object.label || '',
    showFullScreenButton: true,
    extraConfig: {},
    fitTo: 'widthAndHeight',
    objectColor: (_object, _defaultColor, extraConfig) => 'red',
    // Callbacks
    onChartRendered: (_chart) => {},
    onChartRenderingFailed: (_chart) => {},
    onChartRerenderingStarted: (_chart) => {},
    onObjectSelected: (_selectedObject) => {},
    onObjectDeselected: (_deselectedObject) => {},
    onObjectClicked: (_object) => {},
    onFullScreenOpened: () => {},
    onFullScreenClosed: () => {},
    onSubmitSucceeded: () => {},
    onSubmitFailed: () => {},
    // Deprecated
    themeColors: {},
    themePreset: 'someTheme'
}

// Static Mode
const eventManagerStaticModeConfig: Required<EventManagerStaticModeConfigOptions> = {
    ...fullEventManagerConfig,
    mode: 'static',
    onObjectMouseOver: object => {},
    onObjectMouseOut: object => {},
    tooltipContents: object => 'tooltipContents',
    events: ['eventA', 'eventB']
}

// Manage object statuses
const eventManagerManageObjectStatusesConfig: Required<EventManagerManageObjectStatusesModeConfigOptions> = {
    ...fullEventManagerConfig,
    mode: 'manageObjectStatuses',
    events: ['eventA', 'eventB'],
    session: 'continue'
}

// Manage channels
const eventManagerManageChannelsConfig: Required<EventManagerManageChannelsModeConfigOptions> = {
    ...fullEventManagerConfig,
    mode: 'manageChannels',
    event: 'eventA',
    manageChannelsList: true,
    unavailableObjectsSelectable: false
}

// Manage categories
const eventManagerManageCategoriessConfig: Required<EventManagerManageCategoriesModeConfigOptions> = {
    ...fullEventManagerConfig,
    mode: 'manageCategories',
    unavailableObjectsSelectable: false
}

// Filter sections
const eventManagerFilterSectionsConfig: Required<EventManagerFilterSectionsModeConfigOptions> = {
    ...fullEventManagerConfig,
    mode: 'filterSections',
    onFilteredSectionChange: (sectionsLabels) => ({})
}

// Select mode
const eventManagerSelectModeConfig: Required<EventManagerSelectModeConfigOptions> = {
    ...fullEventManagerConfig,
    mode: 'select',
    maxSelectedObjects: 1,
    numberOfPlacesToSelect: 1,
    selectedObjects: [],
    selectionBy: 'places',
    ticketTypes: [],
    tooltipContents: (object: object) => '',
    unavailableObjectsSelectable: false,
    selectableObjects: ['A'],
    events: ['eventA', 'eventB'],
    objectIcon: (_object, _defaultIcon, _extraConfig) => 'circle',
    objectTooltip: {
        showOrderId: true,
        showTechnicalLabel: true,
        showLabel: true,
        showCategory: true,
        showChannel: true,
        showActionHint: true
    }
}

// Set up a complete Chart Designer config - normal mode
const chartDesignerConfigNormalMode: Required<ChartDesignerConfigOptions> = {
    secretKey: 'mySecretKey',
    divId: 'chartContainer',
    container: document.body,
    chartKey: 'myChartKey',
    language: 'en',
    features: {
        disabled: ['areas', 'backgroundImage'],
        readOnly: ['categoryList', 'chartName']
    },
    mode: 'normal',
    openDraftDrawing: true,
    openLatestDrawing: true,
    canvasColorScheme: 'auto',
    // Callbacks
    onChartCreated: _chartKey => {},
    onChartUpdated: _chartKey => {},
    onChartPublished: _chartKey => {},
    onExitRequested: () => {},
    onDesignerRendered: _designer => {},
    onDesignerRenderingFailed: designer => { designer.destroy() }
}

// Set up a complete Chart Designer config - normal mode
const chartDesignerConfigSafeMode: Required<ChartDesignerConfigOptions> = {
    secretKey: 'mySecretKey',
    divId: 'chartContainer',
    container: document.body,
    chartKey: 'myChartKey',
    language: 'en',
    features: {
        disabled: ['areas', 'backgroundImage'],
        readOnly: ['categoryList', 'chartName']
    },
    mode: 'safe',
    safeModeOptions: {
        allowDeletingObjects: true
    },
    openDraftDrawing: true,
    openLatestDrawing: true,
    canvasColorScheme: 'auto',
    // Callbacks
    onChartCreated: _chartKey => {},
    onChartUpdated: _chartKey => {},
    onChartPublished: _chartKey => {},
    onExitRequested: () => {},
    onDesignerRendered: _designer => {},
    onDesignerRenderingFailed: designer => { designer.destroy() }
}

// Event Manager Select Mode
let emSelectMode = new seatsio.EventManager({
    secretKey: 'mySecretKey',
    mode: 'select',
    events: ["event1", "event2"], // OR event: 'event1'
})
emSelectMode.setHighlightedObjects(['A-1'])
emSelectMode.clearHighlightedObjects()


// Event Manager Static Mode
new seatsio.EventManager({
    secretKey: 'mySecretKey',
    mode: 'static',
    events: ["event1", "event2"], // OR event: 'event1',
    onObjectMouseOver: o => console.log(o),
    onObjectMouseOut: o => console.log(o),
    tooltipContents: o => "This is some tooltipContent"
})

// Global seatsio object works as expected
const seatingChart = new seatsio.SeatingChart({
    workspaceKey: 'myWorkspaceKey',
    event: 'myEvent'
})

new seatsio.EventManager({
    event: 'myEvent',
    secretKey: 'mySecretKey',
    mode: 'static'
})

new seatsio.SeatingChartDesigner({
    secretKey: 'mySecretKey'
})

// Seating chart tests
seatingChart.selectObjects(['A1', { id: 'someId', ticketType: 'aTicketType', amount: 2}])
seatingChart.deselectObjects(['A1', { id: 'someId', ticketType: 'aTicketType', amount: 2}])

seatingChart.listSelectedObjects().then(objects => {
    objects.forEach(obj => {
        obj.accessible
        obj.category
        obj.companionSeat
        obj.deselect
        obj.displayObjectType
        obj.label
        obj.labels
        obj.objectType
        obj.pricing
        obj.restrictedView
        obj.select
        obj.selectable
        obj.selected
        obj.selectedTicketType
    })
})
