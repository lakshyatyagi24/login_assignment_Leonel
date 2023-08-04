import maintenancePageConfig from './maintenance/maintenancePageConfig';
import activitiesPageConfig from './activities/activitiesPageConfig';
import authenticationPagesConfig from './authentication/authenticationPagesConfig';
import comingSoonPagesConfig from './coming-soon/comingSoonPagesConfig';
import invoicePagesConfig from './invoice/invoicePagesConfig';
import errorPagesConfig from './error/errorPagesConfig';
import pricingPagesConfig from './pricing/pricingPagesConfig';
import searchPagesConfig from './search/searchPagesConfig';
import rejectPageConfig from './reject/rejectPageConfig';

const pagesConfigs = [
  ...authenticationPagesConfig,
  comingSoonPagesConfig,
  errorPagesConfig,
  maintenancePageConfig,
  rejectPageConfig,
  invoicePagesConfig,
  activitiesPageConfig,
  pricingPagesConfig,
  searchPagesConfig
];

export default pagesConfigs;
