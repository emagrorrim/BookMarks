Given(/^Fill textfield with "([^"]*)" and "([^"]*)"$/) do |title, address|
  sleep 1
  result = all('#searchBar span b')
  NumOfBookMarks = result[0].text.to_i
  click_button('addNewBtn')
  fill_in('nameTextField', :with => title)
  fill_in('addressTextField', :with => address)
  click_button('submitBtn')
  sleep 3
end

Given(/^Result add one$/) do
  result = all('#searchBar span b')
  expect(result[0].text.to_i).to eq (NumOfBookMarks+1)
end

Given(/^First title is "([^"]*)"$/) do |title|
  result = all('#listItem #listItemTitle')
  expect(result[0].text).to eq title
end
