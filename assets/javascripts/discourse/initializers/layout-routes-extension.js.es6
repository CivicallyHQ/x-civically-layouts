import { renderTemplateCategory } from 'discourse/plugins/discourse-layouts/discourse/lib/display';

export default {
  name: 'layouts-routes-extension',
  initialize(container){
    const site = container.lookup('site:main');
    const siteSettings = container.lookup('site-settings:main');

    if (site.mobileView && !siteSettings.layouts_mobile_enabled || !siteSettings.layouts_enabled) { return; }

    let discoveryCategoryRoutes = [
      'CategoryWithGrandparent',
    ];

    let filters = site.get('filters');
    filters.push('top');
    filters.forEach(filter => {
      discoveryCategoryRoutes.push(...[
        `${filter.capitalize()}CategoryWithGrandparent`
      ]);
    });

    site.get('periods').forEach(period => {
      discoveryCategoryRoutes.push(...[
        `Top${period.capitalize()}CategoryWithGrandparent`
      ]);
    });

    discoveryCategoryRoutes.forEach(function(route){
      var route = container.lookup(`route:discovery.${route}`);
      route.reopen({
        renderTemplate(controller, model) {
          renderTemplateCategory(this, model.category, this.get('routeName'));
        }
      });
    });
  }
};
