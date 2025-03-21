*** Settings ***
Library          RequestsLibrary
Resource         ../../resources/main.robot

*** Keywords ***   
Login com sucesso
    ${response}    Realizar login e obter token test@test.com 123
    RETURN    ${response}

Login falho ${email} ${password}
    ${response}=    Realizar login e obter token ${email} ${password}
    RETURN    ${response}


*** Test Cases ***
TC01 - Realizando login com sucesso
       ${response}=     Login com sucesso
       Should Be Equal As Strings    ${response.status_code}    200
       Should Not Be Empty    ${response.json()["token"]}    
       Log    ${response.json()}

TC02 - Realizando login com email inválido
       ${response}=     Login falho invalid@mail.com 123
       Should Be Equal As Strings    ${response.status_code}    404
       Should Be Equal As Strings    ${response.json()["error"]}    Usuário não encontrado
       Log    ${response.json()}

TC03 - Realizando login com senha inválida
        ${response}=    Login falho test@test.com 12345
        Should Be Equal As Strings    ${response.status_code}    401
        Should Be Equal As Strings    ${response.json()["error"]}    Credenciais incorretas   
        Log    ${response.json()}



        
    