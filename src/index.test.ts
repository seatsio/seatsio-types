import {
    ChartDesignerConfigOptions,
    ChartRendererConfigOptions,
    EventManagerConfigOptions,
    EventManagerCreateOrderModeConfigOptions,
    EventManagerEditOrderModeConfigOptions,
    EventManagerFilterSectionsModeConfigOptions,
    EventManagerManageCategoriesModeConfigOptions,
    EventManagerManageChannelsModeConfigOptions,
    EventManagerManageObjectStatusesModeConfigOptions,
    EventManagerSelectModeConfigOptions,
    EventManagerStaticModeConfigOptions,
    LegacyPricing,
    Pricing
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
        ], channels: [
                { channel: 'channel1', price: 30},
            ]},
        { category: 'C', price: 10, channels: [
                { channel: 'channel1', price: 30},
                { channel: 'channel2', originalPrice: 40, price: 50},
                { channel: 'channel3', ticketTypes: [
                    { ticketType: 'adult', price: 60 },
                    { ticketType: 'child', price: 70, label: 'Children' }
                ]}
            ]
        },
        { objects: ['A-1', 'A-2'], price: 10 },
        { objects: ['B-1'], ticketTypes: [
                { ticketType: 'adult', price: 30, label: 'Adults' },
                { ticketType: 'child', price: 20, label: 'Children' },
                { ticketType: 'senior', price: 25, label: 'Senior', description: '65+ – Requires ID' }
            ]
        }
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
    selectableObjects: ['A-1', 'A-2', { label: 'GA', amount: 4 }],
    selectionValidators: [
        { type: 'minimumSelectedPlaces', minimum: 4 },
        { type: 'consecutiveSeats' },
        { type: 'noOrphanSeats', highlight: false, mode: 'lenient', ignoreCategories: false},
        { type: 'companionSeats', enabled: true}
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
    selectedObjectsInputName: 'inputName',
    objectWithoutPricingSelectable: true,
    objectWithoutCategorySelectable: true,
    objectPopover: {
        showAvailability: false,
        showCategory: true,
        showLabel: true,
        showPricing: true,
        showUnavailableNotice: true,
        stylizedLabel: true,
        confirmSelection: 'auto'
    },
    popoverInfo: object => "[b]This[/b] object's [i]id[/i] is [pre]" + object.label + "[/pre]",
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
    showAccessibilityFilter: true,
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
        font: 'Inter',
        buttonShape: 'round',
        cornerRadius: 'round',

        // Deprecated:
        border: '3d',
        borderRadius: 'asymmetrical',
        buttonFace: 'fillEnabled',
        fontWeight: 'bolder',
        padding: 'spacious'
    },
    fitTo: 'width',

    // Callbacks.

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
    onSelectedObjectUnavailable: _object => {},
    onSessionInitialized: _holdToken => { },
    onHoldSucceeded: (_objects, _ticketTypes) => {},
    onHoldFailed: (_objects, _ticketTypes) => {},
    onHoldTokenExpired: () => {},
    onReleaseHoldSucceeded: (_objects, _ticketTypes) => {},
    onReleaseHoldFailed: (_objects, _ticketTypes) => {},
    onSelectionValid: () => {},
    onSelectionInvalid: () => {},
    onHoldCallsInProgress: () => {},
    onHoldCallsComplete: () => {},
    onFilteredCategoriesChanged: _categories => {},
    onFloorChanged: _floor => {},
    onPlacesPrompt: (parameters, confirmSelection) => {
        confirmSelection(parameters.minPlaces)
    },
    onTicketTypePrompt: (parameters, confirmSelection) => {
        confirmSelection(parameters.ticketTypes[0].ticketType)
    },
    onPlacesWithTicketTypesPrompt: (parameters, confirmSelection) => {
        confirmSelection([parameters.ticketTypes[0].ticketType, parameters.ticketTypes[1].ticketType])
        confirmSelection({'adult': 10})
    },
    unifiedObjectPropertiesInCallbacks: true,
    ticketBuyerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',

    // Deprecated.

    allowOrphanSeats: false,
    alwaysShowSectionContents: false,
    customTooltipText: false,
    holdOnSelect: false,
    isObjectSelectable: () => true,
    objectCategory: () => {},
    onScrolledOutOfBoundsVertically: () => {},
    onSelectedObjectBooked: _object => {},
    orphanSeats: '',
    showRowLabels: false,
    showRowLines: false,
    themeColors: 'someTheme',
    themePreset: 'somePreset',
    tooltipStyle: 'someStyle',
    hideSectionsNotForSale: false,
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
    tooltipInfo: object => "[b]This[/b] object's [i]id[/i] is [pre]" + object.label + "[/pre]"
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
        font: 'Inter',
        buttonShape: 'round',
        cornerRadius: 'round',

        // Deprecated:
        border: '3d',
        borderRadius: 'asymmetrical',
        buttonFace: 'fillEnabled',
        fontWeight: 'bolder',
        padding: 'spacious'
    },
    event: 'myEvent',
    language: 'de',
    messages: {
        allPlacesAvailable: 'All free',
        myCustomString: 'This is a custom string'
    },
    selectedObjects: ['A-1'],
    mode: 'manageObjectStatuses',
    objectPopover: {
        showOrderId: true,
        showTechnicalLabel: false
    },
    secretKey: 'mySecretKey',
    viewSettingsDefaults: {
        showRowLabels: true,
        showSeatLabels: true,
        useChannelColors: true
    },
    popoverInfo: object => object.label || '',
    showFullScreenButton: true,
    extraConfig: {},
    fitTo: 'widthAndHeight',
    objectColor: (_object, _defaultColor, extraConfig) => 'red',

    // Callbacks.

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

    // Deprecated.

    themeColors: {},
    themePreset: 'someTheme',
    objectTooltip: {
        showOrderId: true,
        showTechnicalLabel: false
    },
    tooltipInfo: object => object.label || ''
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
    },
    isObjectSelectable: (_object) => true
}

// Create order mode
const eventManagerCreateOrderModeConfig: Required<EventManagerCreateOrderModeConfigOptions> = {
    ...fullEventManagerConfig,
    mode: 'createOrder',
    events: ['eventA', 'eventB'],
    pricing: [
        { category: 'A', price: 10, originalPrice: 15 }
    ],
    priceFormatter: price => '$' + price,
    selectionValidators: [{ type: 'noOrphanSeats'}],
    maxSelectedObjects: 4,
    objectWithoutPricingSelectable: true,
    categoryFilter: { enabled: true },
    availableCategories: [1, 2, 'Balcony'],
    unavailableCategories: [3, 4, 'Stalls'],
    filteredCategories: ['Stalls'],
    channels: ['0ef73fd9-693c-5073-98ac-d1dd8cd86536', 'NO_CHANNEL'],
    session: 'continue',
    holdToken: 'myToken',
    legend: {},
    showLegend: true,
    numberOfPlacesToSelect: 2,

    // Callbacks.
    onSessionInitialized: _holdToken => { },
    onHoldSucceeded: (_objects, _ticketTypes) => {},
    onHoldFailed: (_objects, _ticketTypes) => {},
    onHoldTokenExpired: () => {},
    onReleaseHoldSucceeded: (_objects, _ticketTypes) => {},
    onReleaseHoldFailed: (_objects, _ticketTypes) => {},
    onSelectionValid: () => {},
    onSelectionInvalid: () => {},
    onHoldCallsInProgress: () => {},
    onHoldCallsComplete: () => {},
    onFilteredCategoriesChanged: _categories => {}
}

// Edit order mode
const eventManagerEditOrderModeConfig: Required<EventManagerEditOrderModeConfigOptions> = {
    ...fullEventManagerConfig,
    mode: 'editOrder',
    events: ['eventA', 'eventB'],
    pricing: [
        { category: 'A', price: 10, originalPrice: 15 }
    ],
    priceFormatter: price => '$' + price,
    selectionValidators: [{ type: 'noOrphanSeats'}],
    maxSelectedObjects: 4,
    objectWithoutPricingSelectable: true,
    categoryFilter: { enabled: true },
    availableCategories: [1, 2, 'Balcony'],
    unavailableCategories: [3, 4, 'Stalls'],
    filteredCategories: ['Stalls'],
    channels: ['0ef73fd9-693c-5073-98ac-d1dd8cd86536', 'NO_CHANNEL'],
    session: 'continue',
    holdToken: 'myToken',
    legend: {},
    showLegend: true,
    order: [{label: 'A-1'}, 'A-2', {label: 'A-3', ticketType: 'adult', amount: 1}],

    // Callbacks.
    onSessionInitialized: _holdToken => { },
    onHoldSucceeded: (_objects, _ticketTypes) => {},
    onHoldFailed: (_objects, _ticketTypes) => {},
    onHoldTokenExpired: () => {},
    onReleaseHoldSucceeded: (_objects, _ticketTypes) => {},
    onReleaseHoldFailed: (_objects, _ticketTypes) => {},
    onSelectionValid: () => {},
    onSelectionInvalid: () => {},
    onHoldCallsInProgress: () => {},
    onHoldCallsComplete: () => {},
    onFilteredCategoriesChanged: _categories => {}
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


// Set up a complete Chart Designer config - readOnly mode
const chartDesignerConfigReadOnlyMode: Required<ChartDesignerConfigOptions> = {
    secretKey: 'mySecretKey',
    divId: 'chartContainer',
    container: document.body,
    chartKey: 'myChartKey',
    language: 'en',
    features: {
        disabled: ['areas', 'backgroundImage'],
        readOnly: ['categoryList', 'chartName']
    },
    mode: 'readOnly',
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

// Set up a complete Chart Designer config - safe mode
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
        allowDeletingObjects: true,
        allowEditingAreaCapacity: true
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

let eventManager = new seatsio.EventManager({
    event: 'myEvent',
    secretKey: 'mySecretKey',
    mode: 'static'
});

new seatsio.SeatingChartDesigner({
    secretKey: 'mySecretKey'
})

// Seating chart tests
seatingChart.doSelectObjects(['A1', { label: 'someLabel', ticketType: 'aTicketType', amount: 2 }, { label: 'anotherLabel', amount: 2 }])
seatingChart.trySelectObjects(['A1', { label: 'someLabel', ticketType: 'aTicketType', amount: 2 }, { label: 'anotherLabel', amount: 2 }])
seatingChart.deselectObjects(['A1', { label: 'someLabel', ticketType: 'aTicketType', amount: 2 }])

seatingChart.listSelectedObjects().then(objects => {
    objects.forEach(obj => {
        obj.accessible
        obj.category
        obj.companionSeat
        obj.liftUpArmrests
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

// Event Manager tests
eventManager.listOrderChanges().then(objects => {
    objects.forEach(orderChange => {
        console.log(orderChange.type, orderChange.object, orderChange.ticketType)
    })
})

// Pricing tests
const legacyPricing: Required<LegacyPricing> = [
    { category: 'A', price: 10, originalPrice: 15 },
    { category: 'B', ticketTypes: [
        { ticketType: 'adult', price: 30, label: 'Adults' },
    ]},
    { objects: ['A-1', 'A-2'], price: 10 },
    { objects: ['A-1', 'A-2'], ticketTypes: [
        { ticketType: 'Adult', price: 10}
    ]}
]

const objectPricing: Required<Pricing> = {
    allFeesIncluded: true,
    priceFormatter: price => '$' + price,
    prices: [
        { category: 'A', price: 10, originalPrice: 15, fee: 1 },
        { category: 'B', ticketTypes: [
            { ticketType: 'adult', price: 30, label: 'Adults', fee: 2 },
        ]},
        { objects: ['A-1', 'A-2'], price: 10, fee: 1 },
        { objects: ['A-1', 'A-2'], ticketTypes: [
            { ticketType: 'Adult', price: 10, fee: 1 }
        ]
    }],
    showSectionPricingOverlay: true
}
