```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
  activate server
  server->>browser: redirect https://studies.cs.helsinki.fi/exampleapp/notes 
  deactivate server
  
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate server
  server->>browser: HTML document
  deactivate server
  
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server-->>browser: the css file
  deactivate server
  
  Note right of browser: The browser starts executing the JavaScript code that fetches the   JSON from the server
      
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server-->>browser: [{content: "stop the genocide in palestine", date: "2024-05-        30T19:02:52.363Z"},…]
  deactivate server    
  
  Note right of browser: The browser executes the callback function that renders the notes 
