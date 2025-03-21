*** Settings ***
Library    RequestsLibrary
Resource    main.robot


*** Keywords ***

Fazer requisição GET
    [Arguments]    ${endpoint}    ${headers}
    ${response}    GET    ${BASE_URL}/${endpoint}    headers=${headers}    expected_status=ANY
    RETURN    ${response}

Fazer requisição POST
    [Arguments]    ${endpoint}    ${body}    ${headers}
    ${response}    POST    ${BASE_URL}/${endpoint}   json=${body}    headers=${headers}    expected_status=ANY
    RETURN    ${response}

Fazer requisição PUT
    [Arguments]    ${endpoint}    ${body}    ${id}    ${headers}
    ${response}    POST    ${BASE_URL}/${endpoint}/${id}   json=${body}    headers=${headers}    expected_status=ANY
    RETURN    ${response}

Fazer requisição DELETE
    [Arguments]    ${endpoint}    ${id}    ${headers}
    ${response}    DELETE    ${BASE_URL}/${endpoint}/${id}    headers=${headers}    expected_status=ANY
    RETURN    ${response}