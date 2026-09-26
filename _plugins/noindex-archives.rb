Jekyll::Hooks.register :site, :pre_render do |site|
  site.pages.each do |page|
    next unless defined?(Jekyll::Archives::Archive) && page.is_a?(Jekyll::Archives::Archive)

    page.data['sitemap'] = false
    page.data['noindex'] = true
  end
end
