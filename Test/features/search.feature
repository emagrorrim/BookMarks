Feature: BookMarks
	Scenario: Search csdn
		* Open the homepage
		* Search "csdn"
		* Have 4 result
		* Clear search

	Scenario: Add taobao bookmark
		* Open the homepage
		* Fill textfield with "TaoBao" and "https://www.taobao.com"
		* Result add one
		* First title is "TaoBao"

	Scenario: Add first bookmark
		* Open the homepage
		* Delete number 1 delete button
		* Rssult sub one
