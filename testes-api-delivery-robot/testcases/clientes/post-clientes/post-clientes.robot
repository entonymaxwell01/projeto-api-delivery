*** Settings ***
Library    RequestsLibrary
Library    FakerLibrary  locale=pt_BR
Resource    ../../../resources/main.robot


*** Keywords ***
Cadastrar cliente com sucesso
    ${nome}=    FakerLibrary.Name
    ${email}=    FakerLibrary.Email  
    ${cpf_number}=    FakerLibrary.Random Number    
    ${cpf}=    Convert To String  ${cpf_number}
    ${password}=    FakerLibrary.Password
    ${body}=    Create Dictionary    nome=${nome}    email=${email}    cpf=${cpf}    password=${password}
    ${response}=    Fazer requisição POST    clientes    ${body}    ${HEADERS}
    RETURN    ${response}

Cadastrar cliente com erro
    [Arguments]    ${body}
    ${response}=    Fazer requisição POST    clientes    ${body}    ${HEADERS}
    RETURN    ${response}
    

*** Test Cases ***
TC01 - Cadastrando um novo cliente com sucesso
    ${response}=    Cadastrar cliente com sucesso
    Should Be Equal As Strings    ${response.status_code}    201
    Should Not Be Empty    ${response.json()}
    Log    ${response.json()}

TC02 - Cadastrando um novo cliente com email já cadastrado
    ${nome}=    FakerLibrary.Name
    ${cpf_number}=    FakerLibrary.Random Number
    ${cpf}=    Convert To String  ${cpf_number}
    ${password}=    FakerLibrary.Password
    ${body}=    Create Dictionary    nome=${nome}    email=test@test.com    cpf=${cpf}   password=${password}
    ${response}=    Cadastrar cliente com erro    ${body}   
    Should Be Equal As Strings    ${response.status_code}    400
    Should Be Equal As Strings    ${response.json()["error"]}    Usuário já cadastrado

TC03 - Cadastrando um novo cliente com cpf já cadastrado
    ${nome}=    FakerLibrary.Name
    ${email}=    FakerLibrary.Email
    ${password}=    FakerLibrary.Password
    ${body}=    Create Dictionary    nome=${nome}   email=${email}   cpf=12345678910   password=${password}
    ${response}=    Cadastrar cliente com erro    ${body}   
    Should Be Equal As Strings    ${response.status_code}    400
    Should Be Equal As Strings    ${response.json()["error"]}    Usuário já cadastrado

TC04 - Cadastrando um novo cliente com campos obrigatórios em branco
    ${body}=    Create Dictionary    nome=    email=   cpf=   password=
    ${response}=    Cadastrar cliente com erro    ${body}   
    Should Be Equal As Strings    ${response.status_code}    400
    Should Be Equal As Strings    ${response.json()["error"]}    Campos obrigatórios não preenchidos
