*** Settings ***
Library    RequestsLibrary
Resource    ../../../resources/main.robot

*** Keywords ***
Sucesso ao buscar todos os usuários
    ${AUTH_TOKEN}=    Armazenar token test@test.com 123
    &{header}    Create Dictionary    
    ...    Content-Type=application/json    
    ...    Authorization=${AUTH_TOKEN}
    ${response}    Fazer requisição GET    usuarios    ${header}
    RETURN   ${response}

Falha ao buscar todos os usuários
   [Arguments]    ${header} 
    ${response}    Fazer requisição GET    usuarios    ${header}
    RETURN   ${response}


*** Test Cases ***
TC01 - Buscando todos os usuários cadastrados
    ${response}    Sucesso ao buscar todos os usuários
    Should Be Equal As Strings    ${response.status_code}    200
    Should Not Be Empty    ${response.json()}
    Log    ${response.json()}


TC02 - Buscando todos os usuários cadastrados sem permissão
    ${header}    Create Dictionary    Content-Type=application/json
    ${response}   Falha ao buscar todos os usuários  ${header}
    Should Be Equal As Strings    ${response.status_code}    401
    Should Be Equal As Strings    ${response.json()["error"]}    Acesso negado   
    Log    ${response.json()}

TC03 - Buscando todos os usuários com token inválido
    ${header}    Create Dictionary    Content-Type=application/json    Authorization=Bearer 123
    ${response}   Falha ao buscar todos os usuários  ${header}
    Should Be Equal As Strings    ${response.status_code}    400
    Should Be Equal As Strings    ${response.json()["error"]}    Token inválido   
    Log    ${response.json()}

