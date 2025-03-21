*** Settings ***
Library    RequestsLibrary
Resource    ../../../resources/main.robot

*** Keywords ***
Sucesso ao buscar um usuário com id
    [Arguments]    ${id}
    ${AUTH_TOKEN}=    Armazenar token test@test.com 123
    &{header}    Create Dictionary    
    ...    Content-Type=application/json    
    ...    Authorization=${AUTH_TOKEN}
    ${response}    GET    ${BASE_URL}/usuarios/${id}    headers=${header}    expected_status=ANY  
    RETURN   ${response}

Falha ao buscar um usuário com id 
    [Arguments]   ${id}    ${header} 
    ${response}    Fazer requisição GET    usuarios    ${header}
    RETURN   ${response}


*** Test Cases ***
TC01 - Buscando um usuário cadastrado
    ${response}    Sucesso ao buscar um usuário com id  1 
    Should Be Equal As Strings    ${response.status_code}    200
    Should Not Be Empty    ${response.json()}
    Should Be Equal As Strings    ${response.json()["id"]}    1
    Log    ${response.json()}


TC02 - Buscando todos os usuários cadastrados sem permissão
    ${header}    Create Dictionary    Content-Type=application/json
    ${response}   Falha ao buscar um usuário com id  1  ${header}
    Should Be Equal As Strings    ${response.status_code}    401
    Should Be Equal As Strings    ${response.json()["error"]}    Acesso negado   
    Log    ${response.json()}

TC03 - Buscando todos os usuários com token inválido
    ${header}    Create Dictionary    Content-Type=application/json    Authorization=Bearer 123
    ${response}   Falha ao buscar um usuário com id  1  ${header}
    Should Be Equal As Strings    ${response.status_code}    400
    Should Be Equal As Strings    ${response.json()["error"]}    Token inválido   
    Log    ${response.json()}

TC04 - Buscando um usuário inexistente   
    ${response}   Sucesso ao buscar um usuário com id  999  
    Should Be Equal As Strings    ${response.status_code}    404
    Should Be Equal As Strings    ${response.json()["error"]}    Usuário não encontrado 
    Log    ${response.json()}

