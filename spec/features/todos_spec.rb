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
    fill_in "new-todo", with: "learn grape"

    expect {
      click_button "Add"
      sleep 2 # blah we need to wait for ajax here
    }.to change {
      Todo.count
    }.by(1)

    within "table" do
      expect(page).to have_content "learn grape"
    end
    expect(page).to have_content "learn grape Successfully Created!"
  end

  scenario "it shows done todos with done class" do
    Todo.find_by(label: "first todo").update_attributes(done: true)
    visit root_path
    expect(page).to have_css "td.done"
  end

  scenario "can mark a todo as done and undone" do
    Capybara.match = :first

    expect {
      within "table tr td" do
        click_button ""
      end
      sleep 2 # blah we need to wait for ajax here
    }.to change {
      Todo.where(done: true).count
    }.by(1)

    expect(page).to have_css "td.done"
    expect(page).to have_content "Successfully Marked As Complete!"


    expect {
      within "table tr td" do
        click_button "" # this is the 
      end
      sleep 2 # blah we need to wait for ajax here
    }.to change {
      Todo.where(done: true).count
    }.by(-1)

    expect(page).to_not have_css "td.done"
    expect(page).to have_content "Successfully Marked As Incomplete!"
  end

  scenario "can delete todos" do
    Capybara.match = :first

    expect {
      click_button "Delete"
      sleep 2 # blah we need to wait for ajax here
    }.to change {
      Todo.count
    }.by(-1)

    within "table" do
      expect(page).to_not have_content("first todo")
    end
    expect(page).to have_content "first todo Successfully Deleted!"
  end

  scenario "cannot add an empty todo" do
    expect { click_button "Add" }.to change { Todo.count }.by(0)
    expect(page).to have_content("Todo cannot be blank!")
    # We know Todo.count has not changed
    # So the row count on the interface should be the original (plus one for the header)
    page.should have_css("table tr", :count => Todo.count + 1)
  end
  scenario "cannot add a duplicate todo" do
    fill_in "new-todo", with: "first todo"
    
    expect { click_button "Add" }.to change { Todo.count }.by(0)
    expect(page).to have_content("You already have to do")
    # We know Todo.count has not changed
    # So the row count on the interface should be the original (plus one for the header)
    page.should have_css("table tr", :count => Todo.count + 1)
  end
end










