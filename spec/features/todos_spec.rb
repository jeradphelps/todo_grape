require 'spec_helper'

feature 'todos', :js => true do
  before :each do
    Todo.create(:label => "first todo")
    Todo.create(:label => "second todo")
    Todo.create(:label => "third todo")
    visit root_path
  end

  scenario "it lists todos in db" do
    expect(page).to have_content "first todo"
    expect(page).to have_content "second todo"
    expect(page).to have_content "third todo"
  end

  scenario "it expects them to be in some specific order" do
    expect("second todo").to appear_before "third todo"

  end

  scenario "it properly adds a todo" do
    original_count = Todo.count
    fill_in "new-todo", with: "learn grape"

    expect {
      click_button "Add"
      sleep 2 # blah we need to wait for ajax here
    }.to change {
      Todo.count
    }.by(1)

    expect(page).to have_content "learn grape"
    expect("learn grape").to appear_after "third todo"
  end

  scenario "it shows done todos with done class" do
    Todo.find_by(label: "first todo").update_attributes(done: true)
    visit root_path
    expect(page).to have_css "td.done"
  end

  scenario "can mark a todo as done and undone" do
    Capybara.match = :first

    expect {
      click_button "Done"
      sleep 2 # blah we need to wait for ajax here
    }.to change {
      Todo.where(done: true).count
    }.by(1)

    expect(page).to have_css "td.done"
    # blah expect button text to change.


    expect {
      click_button "Not Done"
      sleep 2 # blah we need to wait for ajax here
    }.to change {
      Todo.where(done: true).count
    }.by(-1)

    expect(page).to_not have_css "td.done"
  end

  scenario "can delete todos" do
    Capybara.match = :first

    expect {
      click_button "Delete"
      sleep 2 # blah we need to wait for ajax here
    }.to change {
      Todo.count
    }.by(-1)
    expect(page).to_not have_content("first todo")
  end
end










