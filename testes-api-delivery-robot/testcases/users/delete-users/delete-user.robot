*** Settings ***
Library    RequestsLibrary
Resource    ../../../resources/main.robot

*** Keywords ***
Sucesso ao excluir um usuário com id
    [Arguments]    ${id}
    ${AUTH_TOKEN}=    Armazenar token test@test.com 123
    &{header}    Create Dictionary    
    ...    Content-Type=application/json    
    ...    Authorization=${AUTH_TOKEN}
    ${response}    Fazer requisição DELETE    endpoint=usuarios/delete/    id=${id}    headers=${header}
    RETURN   ${response}

Falha ao excluir um usuário com id
    [Arguments]   ${id}    ${header} 
    ${response}    Fazer requisição DELETE    endpoint=usuarios/delete/    id=${id}    headers=${header}
    RETURN   ${response}


*** Test Cases ***
TC01 - Excluindo um usuário cadastrado
    ${response}    Sucesso ao excluir um usuário com id  id=36
    Should Be Equal As Strings    ${response.status_code}    200
    Should Not Be Empty    ${response.json()}
    Should Be Equal As Strings    ${response.json()["message"]}    	Usuário deletado com sucesso
    Should Be Equal As Strings    ${response.json()["userDeleted"]["data"]["id"]}    36
    Log    ${response.json()}


TC02 - Excluindo um usuário sem permissão
    ${header}    Create Dictionary    Content-Type=application/json
    &{header}    Create Dictionary    
    ...    Content-Type=application/json    
    ${response}   Falha ao excluir um usuário com id  1  ${header}
    Should Be Equal As Strings    ${response.status_code}    401
    Should Be Equal As Strings    ${response.json()["error"]}    Acesso negado   
    Log    ${response.json()}

TC03 - Excluindo um usuário com token inválido
    ${header}    Create Dictionary    Content-Type=application/json    Authorization=Bearer 123
    ${response}   Falha ao excluir um usuário com id  1  ${header}
    Should Be Equal As Strings    ${response.status_code}    400
    Should Be Equal As Strings    ${response.json()["error"]}    Token inválido   
    Log    ${response.json()}

TC04 - Excluindo um usuário inexistente   
    ${response}   Sucesso ao excluir um usuário com id  999  
    Should Be Equal As Strings    ${response.status_code}    404
    Should Be Equal As Strings    ${response.json()["error"]}    Usuário não encontrado 
    Log    ${response.json()}

