# Builds site.translations: a map from a page's base path to the languages it exists in.
#
#   "/pages/quickstarts" => ["en", "pt", "de"]
#
# A translation is a file named <page>.<lang>.md next to the English <page>.md.
# head.html uses this map for canonical and hreflang tags, and language-switcher.html
# uses it to link to the translation of the current page.
#
# Polyglot only keeps one translation of a page in each language build, so the templates
# cannot find the others by looking at site.pages. This scans the source files instead.
Jekyll::Hooks.register :site, :after_init do |site|
  languages = site.config['languages'] || []
  default_lang = site.config['default_lang'] || 'en'
  others = languages - [default_lang]
  map = {}
  skip = %w[_site vendor node_modules .git .jekyll-cache _drawings]

  Dir.glob(File.join(site.source, '**', '*.md')).sort.each do |file|
    rel = file.sub(site.source, '').tr('\\', '/')
    next if skip.any? { |dir| rel.start_with?("/#{dir}/") }

    head = File.open(file, 'r:bom|utf-8') { |f| f.read(1500) } || ''
    next unless head.start_with?('---')
    next if head =~ /^published:\s*false/

    base = rel.sub(/\.md\z/, '')
    lang = default_lang
    unless others.empty?
      match = base.match(/\A(.*)\.(#{others.join('|')})\z/)
      if match
        base = match[1]
        lang = match[2]
      end
    end
    (map[base] ||= []) << lang
  end

  site.config['translations'] = map
end
