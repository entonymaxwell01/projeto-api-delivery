*** Settings ***
Library    RequestsLibrary
Library    FakerLibrary  locale=pt_BR
Resource    ../../../resources/main.robot




*** Keywords ***
Atualizar um usuário com sucesso
    [Arguments]    ${id}    ${body}
    ${AUTH_TOKEN}=    Armazenar token test@test.com 123
    &{header}    Create Dictionary    
    ...    Content-Type=application/json    
    ...    Authorization=${AUTH_TOKEN}
    ${response}=    Fazer requisição PUT  id=${id}  endpoint=usuarios/update/   body=${body}   headers=${header}
    RETURN    ${response}

Atualizar um usuário com erro
    [Arguments]    ${id}    ${body}    ${header}
    ${response}=    Fazer requisição PUT  id=${id}  endpoint=usuarios/update/   body=${body}   headers=${header}
    RETURN    ${response}
    

*** Test Cases ***
TC01 - Atualizando um usuário com sucesso
    ${body}=    Create Dictionary    nome=Usuario de testes    email=test@test2.com    cpf=12345678920
    ${response}=    Atualizar um usuário com sucesso   id=5    body=${body}
    Should Be Equal As Strings    ${response.status_code}    200
    Should Not Be Empty    ${response.json()}
    Should Be Equal As Strings    ${response.json()["message"]}    Usuário atualizado com sucesso
    Log    ${response.json()}
    Should Be Equal As Strings    ${response.json()["userUpdate"]["data"]["id"]}        5
    Should Be Equal As Strings    ${response.json()["userUpdate"]["data"]["nome"]}    Usuario de testes
    Should Be Equal As Strings    ${response.json()["userUpdate"]["data"]["email"]}    test@test2.com
    Should Be Equal As Strings    ${response.json()["userUpdate"]["data"]["cpf"]}       12345678920

TC02 - Atualizando um usuário com email cadastrado por outro usuário
    ${nome}=    FakerLibrary.Name
    ${cpf_number}=    FakerLibrary.Random Number
    ${cpf}=    Convert To String  ${cpf_number}
    ${password}=    FakerLibrary.Password
    ${body}=    Create Dictionary    nome=${nome}    email=test@test.com    cpf=${cpf}   password=${password}
    ${AUTH_TOKEN}=    Armazenar token test@test.com 123
    &{header}    Create Dictionary    
    ...    Content-Type=application/json    
    ...    Authorization=${AUTH_TOKEN}
    ${response}=    Atualizar um usuário com erro    id=5    body=${body}   header=${header}
    Should Be Equal As Strings    ${response.status_code}    409
    Should Be Equal As Strings    ${response.json()["error"]}    E-mail ou CPF já estão em uso por outro usuário

TC03 - Atualizando um usuário com cpf cadastrado por outro usuário
    ${nome}=    FakerLibrary.Name
    ${email}=    FakerLibrary.Email
    ${password}=    FakerLibrary.Password
    ${body}=    Create Dictionary    nome=${nome}   email=${email}   cpf=12345678910   password=${password}
    ${AUTH_TOKEN}=    Armazenar token test@test.com 123
    &{header}    Create Dictionary    
    ...    Content-Type=application/json    
    ...    Authorization=${AUTH_TOKEN}
    ${response}=    Atualizar um usuário com erro    id=5    body=${body}   header=${header}
    Should Be Equal As Strings    ${response.status_code}    409
    Should Be Equal As Strings    ${response.json()["error"]}    E-mail ou CPF já estão em uso por outro usuário

TC04 - Atualizando um usuário com campos obrigatórios em branco
    ${body}=    Create Dictionary    nome=    email=   cpf=   password=
    ${AUTH_TOKEN}=    Armazenar token test@test.com 123
    &{header}    Create Dictionary    
    ...    Content-Type=application/json    
    ...    Authorization=${AUTH_TOKEN}
    ${response}=    Atualizar um usuário com erro    id=5    body=${body}   header=${header}   
    Should Be Equal As Strings    ${response.status_code}    400
    Should Be Equal As Strings    ${response.json()["error"]}    Campos obrigatórios não preenchidos

TC05 - Atualizando um usuário inexistente
    ${nome}=    FakerLibrary.Name
    ${email}=    FakerLibrary.Email
    ${password}=    FakerLibrary.Password
    ${body}=    Create Dictionary    nome=${nome}   email=${email}   cpf=12345678910   password=${password}
    ${AUTH_TOKEN}=    Armazenar token test@test.com 123
    &{header}    Create Dictionary    
    ...    Content-Type=application/json    
    ...    Authorization=${AUTH_TOKEN}
    ${response}=    Atualizar um usuário com erro    id=999    body=${body}   header=${header}
    Should Be Equal As Strings    ${response.status_code}    404
    Should Be Equal As Strings    ${response.json()["error"]}    Usuário não encontrado

TC06 - Atualizando um usuário sem permissão
    ${nome}=    FakerLibrary.Name
    ${email}=    FakerLibrary.Email
    ${password}=    FakerLibrary.Password
    ${body}=    Create Dictionary    nome=${nome}   email=${email}   cpf=12345678910   password=${password}
    &{header}    Create Dictionary    Content-Type=application/json    
    ${response}=    Atualizar um usuário com erro  999   ${body}    header=${header}
    Should Be Equal As Strings    ${response.status_code}    401
    Should Be Equal As Strings    ${response.json()["error"]}    Acesso negado

TC07 - Atualizando um usuário com token inválido
    ${nome}=    FakerLibrary.Name
    ${email}=    FakerLibrary.Email
    ${password}=    FakerLibrary.Password
    ${body}=    Create Dictionary    nome=${nome}   email=${email}   cpf=12345678910   password=${password}
    &{header}    Create Dictionary    Content-Type=application/json   Authorization=Bearer 123  
    ${response}=    Atualizar um usuário com erro  999   ${body}    header=${header}
    Should Be Equal As Strings    ${response.status_code}    400
    Should Be Equal As Strings    ${response.json()["error"]}    Token inválido