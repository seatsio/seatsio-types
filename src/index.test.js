"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Set up a fully popuplated Chart Renderer config
var fullChartRendererConfig = {
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
            ] }
    ],
    priceFormatter: function (price) { return '$' + price; },
    showSectionPricingOverlay: true,
    selectedObjects: [
        'A-1',
        {
            label: 'A-2',
            ticketType: 'child',
        },
        {
            label: 'General Admission',
            amount: 4
        },
    ],
    selectableObjects: ['A-1', 'A-2'],
    selectionValidators: [
        { type: 'minimumSelectedPlaces', minimum: 4 },
        { type: 'consecutiveSeats' },
        { type: 'noOrphanSeats', highlight: false, mode: 'lenient' }
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
    canGASelectionBeIncreased: function (_gaArea, defaultValue, _extraConfig, _ticketType) { return defaultValue; },
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
    tooltipInfo: function (object) { return "[b]This[/b] object's [i]id[/i] is [pre]" + object.label + "[/pre]"; },
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
        zoomOnSelect: false
    },
    availableCategories: [1, 2, 'Balcony'],
    unavailableCategories: [3, 4, 'Stalls'],
    filteredCategories: ['Stalls'],
    channels: ['0ef73fd9-693c-5073-98ac-d1dd8cd86536', 'NO_CHANNEL'],
    objectColor: function (_object, _defaultColor, _extraConfig) { return 'red'; },
    sectionColor: function (_object, _defaultColor, _extraConfig) { return 'blue'; },
    objectLabel: function (object, _defaultLabel, _extraConfig) { return "Object label is ".concat(object.label); },
    objectIcon: function (_object, _defaultIcon, _extraConfig) { return 'circle'; },
    showSectionContents: 'onlyAfterZoom',
    isObjectVisible: function (_object, _extraConfig) { return true; },
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
    onChartRendered: function (_chart) { },
    onChartRenderingFailed: function (_chart) { },
    onChartRerenderingStarted: function (_chart) { },
    onObjectSelected: function (_selectedObject) { },
    onObjectDeselected: function (_deselectedObject) { },
    onObjectClicked: function (_object) { },
    onFullScreenOpened: function () { },
    onFullScreenClosed: function () { },
    onObjectMouseOver: function (_object) { },
    onObjectMouseOut: function (_object) { },
    onObjectStatusChanged: function (_object) { },
    onSelectedObjectBooked: function (_object) { },
    onSessionInitialized: function (_holdToken) { },
    onHoldSucceeded: function (_objects, _ticketTypes) { },
    onHoldFailed: function (_objects, _ticketTypes) { },
    onHoldTokenExpired: function () { },
    onReleaseHoldSucceeded: function (_objects, _ticketTypes) { },
    onReleaseHoldFailed: function (_objects, _ticketTypes) { },
    onSelectionValid: function () { },
    onSelectionInvalid: function () { },
    onFilteredCategoriesChanged: function (_categories) { },
    onFloorChanged: function (_floor) { },
    unifiedObjectPropertiesInCallbacks: true,
    // Deprecated
    allowOrphanSeats: false,
    alwaysShowSectionContents: false,
    customTooltipText: false,
    holdOnSelect: false,
    isObjectSelectable: function () { return true; },
    objectCategory: function () { },
    onScrolledOutOfBoundsVertically: function () { },
    orphanSeats: '',
    showRowLabels: false,
    showRowLines: false,
    themeColors: 'someTheme',
    themePreset: 'somePreset',
    tooltipStyle: 'someStyle'
};
// Set up a fully popuplated Event Manager config
var fullEventManagerConfig = {
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
        showOrderId: false,
        showTechnicalLabel: true
    },
    secretKey: 'mySecretKey',
    viewSettingsDefaults: {
        showRowLabels: true,
        showSeatLabels: true,
        useChannelColors: true
    },
    tooltipInfo: function (object) { return object.label || ''; },
    showFullScreenButton: true,
    extraConfig: {},
    fitTo: 'widthAndHeight',
    objectColor: function (_object, _defaultColor, extraConfig) { return 'red'; },
    // Callbacks
    onChartRendered: function (_chart) { },
    onChartRenderingFailed: function (_chart) { },
    onChartRerenderingStarted: function (_chart) { },
    onObjectSelected: function (_selectedObject) { },
    onObjectDeselected: function (_deselectedObject) { },
    onObjectClicked: function (_object) { },
    onFullScreenOpened: function () { },
    onFullScreenClosed: function () { },
    onSubmitSucceeded: function () { },
    onSubmitFailed: function () { },
    // Deprecated
    themeColors: {},
    themePreset: 'someTheme'
};
// Set up a fully popuplated Chart Designer config
var chartDesignerConfig = {
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
    openDraftDrawing: true,
    openLatestDrawing: true,
    canvasColorScheme: 'auto',
    // Callbacks
    onChartCreated: function (_chartKey) { },
    onChartUpdated: function (_chartKey) { },
    onChartPublished: function (_chartKey) { },
    onExitRequested: function () { },
    onDesignerRendered: function (_designer) { },
    onDesignerRenderingFailed: function (designer) { designer.destroy(); }
};
// Event Manager Select Mode
var emSelectMode = new seatsio.EventManager({
    secretKey: 'mySecretKey',
    mode: 'select',
    events: ["event1", "event2"], // OR event: 'event1'
});
emSelectMode.setHighlightedObjects(['A-1']);
emSelectMode.clearHighlightedObjects();
// Event Manager Static Mode
new seatsio.EventManager({
    secretKey: 'mySecretKey',
    mode: 'static',
    events: ["event1", "event2"],
    onObjectMouseOver: function (o) { return console.log(o); },
    onObjectMouseOut: function (o) { return console.log(o); },
    tooltipContents: function (o) { return "This is some tooltipContent"; }
});
// Global seatsio object works as expected
new seatsio.SeatingChart({
    workspaceKey: 'myWorkspaceKey',
    event: 'myEvent'
});
new seatsio.EventManager({
    event: 'myEvent',
    secretKey: 'mySecretKey',
    mode: 'static'
});
new seatsio.SeatingChartDesigner({
    secretKey: 'mySecretKey'
});
