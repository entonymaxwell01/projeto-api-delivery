*** Settings ***
Library    RequestsLibrary
Resource    ../../../resources/main.robot

*** Keywords ***
Buscar todos os usuários
    ${AUTH_TOKEN}=    Armazenar token test@test.com 123
    &{header}    Create Dictionary    
    ...    Content-Type=application/json    
    ...    Authorization=${AUTH_TOKEN}
    ${response}    Fazer requisição GET    usuarios    ${header}
    RETURN   ${response}


*** Test Cases ***
TC01 - Buscando todos os usuários cadastrados
    ${response}    Buscar todos os usuários
    Should Be Equal As Strings    ${response.status_code}    200
    Should Not Be Empty    ${response.json()}
    Log    ${response.json()}

