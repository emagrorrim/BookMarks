Given(/^Delete number (\d+) delete button$/) do |num|
  result = all('#searchBar span b')
  NumOfBookMarks = result[0].text.to_i
  result = all('#deleteBtn')
  puts result[(num.to_i-1)].click
  sleep 2 
  page.driver.browser.switch_to.alert.accept
  sleep 2
end

Given(/^Rssult sub one$/) do
  result = all('#searchBar span b')
  expect(result[0].text.to_i).to eq (NumOfBookMarks-1)
end
