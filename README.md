# Documentation

This app allows users to connect to localhost:3000 and query cowsays to make the little cow say either a random word or a designated word.

In the terminal or url:

`localhost:3000` : Brings you to cowsays. Click on the provided link to go to the next page

`localhost:3000/cowsays` : Generates random word and displays cow on page saying the word.

`localhost:3000/cowsays?text=<text>` : \<text> is a stand in for whatever you want the cow to say. Type in a word or phrase and see your cow say it!

`localhost:3000/api/cowsays?text=<text>` : /<text> is a stand in for whatever the cow is saying. This will return a JSON object with the html item as the content.