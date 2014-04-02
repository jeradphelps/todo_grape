module WaitForAjax
  def wait_for_ajax
    # The commented code below is the version implemented by
    # http://robots.thoughtbot.com/automatically-wait-for-ajax-with-capybara
    # However, it seems angular does not have anything analagous to
    # jQuery's active, so just sleep until we have a better solution.
    # Timeout.timeout(Capybara.default_wait_time) do
    #   loop until finished_all_ajax_requests?
    # end
    sleep 2
  end

  def finished_all_ajax_requests?
    page.evaluate_script('jQuery.active').zero?
  end
end

RSpec.configure do |config|
  config.include WaitForAjax, type: :feature
end