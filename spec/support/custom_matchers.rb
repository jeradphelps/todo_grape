

module CustomRSpecMatchers
  RSpec::Matchers.define :appear_before do |later_content|
    match do |earlier_content|
      page.body.index(earlier_content) < page.body.index(later_content)
    end
  end

  RSpec::Matchers.define :appear_after do |earlier_content|
    match do |later_content|
      page.body.index(later_content) > page.body.index(earlier_content)
    end
  end
end

RSpec.configure do |config|
  config.include CustomRSpecMatchers
end