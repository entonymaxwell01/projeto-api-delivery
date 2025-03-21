*** Settings ***
Library    RequestsLibrary
Resource    ../resources/main.robot

*** Variables ***
&{HEADERS}  Content-Type=application/json     


*** Keywords ***
Realizar login e obter token ${EMAIL} ${PASSWORD}
    ${LOGIN_BODY}=    Create Dictionary    email=${EMAIL}    password=${PASSWORD}
    ${response}=    Fazer requisição POST    endpoint=auth/login    body=${LOGIN_BODY}   headers=${HEADERS}
    RETURN    ${response}

Armazenar token ${EMAIL} ${PASSWORD}
    ${response}=    Realizar login e obter token ${EMAIL} ${PASSWORD}
    ${token}=       Set Variable    ${response.json()['token']}
    ${AUTH_TOKEN}=  Set Variable    Bearer ${token} 
    RETURN    ${AUTH_TOKEN}


    
    