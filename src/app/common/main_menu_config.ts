import { MenuConfig } from "./interfaces";

// routes to original experiments and new modules
export const interimMenu = [
    {
        label: 'Position builder',
        route: 'position-builder',
    },
    {
        label: 'Simple chart',
        route: 'simple-chart',
    },
    {
        label: 'Dynamic panel',
        route: 'dynamic-panel',
    },
    {
        label: 'Base components',
        route: 'base-components',
    },
    {
        label: 'Visvol panels',
        route: 'visvol',
    },
    {
        label: 'Experimental components',
        route: 'experiments',
    },
];

export const visVolTopLevelMenu: MenuConfig[] = [
    {
        label: 'Visvol',
        route: '/visvol',
        triggerFor: 'visvolMenu',
    },
    {
        label: 'Experiments',
        route: '/experiments',
        triggerFor: 'experimentsMenu',
    },
    // {
    //     label: 'Account',
    //     route: '/account',
    // },
    // {
    //     label: 'Help',
    //     route: '/help',
    // },
];

export const visvolMenu: MenuConfig[] = [
    {
        label: 'Portfolio',
        route: 'visvol/portfolio',
        triggerFor: 'visvolPortfolioMenu',
    },
    {
        label: 'Opportunities',
        route: 'visvol/opportuntities',
        triggerFor: 'visvolOpportunitiesMenu',
    },
    {
        label: 'Analysis',
        route: 'visvol/analysis',
        triggerFor: 'visvolAnalysisMenu',
    },
];

export const visvolPortfolioMenu = [
    {
        label: 'Dashboard',
        route: 'portfolio/dashboard',
    },
    {
        label: 'Money positions',
        route: 'portfolio/money-positions',
    },
];
export const visvolOpportunitiesMenu = [
    {
        label: 'Dashboard',
        route: 'opportunities/dashboard',
    },
    {
        label: 'Earnings',
        route: 'opportunities/earnings',
    },
];
export const visVolAnalysisMenu = [
    {
        label: 'Position builder',
        route: 'analysis/position-builder',
    },
    {
        label: 'Simple chart',
        route: 'analysis/simple-chart',
    },
];


export const experimentsMenu = [
    {
        label: 'Visvol',
        route: '/experiments/visvol',
    },
    {
        label: 'Angular',
        route: '/experiments/angular',
    },
    {
        label: 'D3',
        route: '/experiments/d3',
    },
    // {
    //     label: 'Games',
    //     route: '/experiments/games',
    // },
    // {
    //     label: 'CSS Grid',
    //     route: '/grid',
    // },
    // {
    //     label: 'CDK Scrolling',
    //     route: '/scroll',
    // },

];

export const experimentsVisvolMenu = [
    {
        label: 'Position builder',
        route: 'experiments/visvol/position-builder',
    },
    {
        label: 'Simple chart',
        route: 'experiments/visvol/simple-chart',
    },
    {
        label: 'Base components',
        route: 'experiments/visvol/base-components',
    },
];

export const materialMenu = [];

export const angularMenu = [];

export const d3Menu = [];
    