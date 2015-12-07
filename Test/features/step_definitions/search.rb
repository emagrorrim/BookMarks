Given(/^Open the homepage$/) do
  visit '/'
  sleep 8
end
Given(/^Search "([^"]*)"$/) do | search_content |
  sleep 1
  fill_in('textField', :with => search_content)
  sleep 1
end

Given(/^Have (\d+) result$/) do | itemNum |
  sleep 1
  result = all('#listItem')
  sleep 1
  expect(result.length).to eq itemNum.to_i
end

Given(/^Clear search$/) do
  fill_in('textField', :with => "")
  sleep 1
end
