export const locatorCatalog = {
  'Object Repository/Backend/API-Request/Current User': {
    kind: 'api',
    method: 'GET',
    url: "${url}/ng-api/v2/account/current-user"
  },
  'Object Repository/Backend/API-Request/GetXandrObjectId': {
    kind: 'api',
    method: 'GET',
    url: "${url}/ng-api/v2/account/xandr-object-viewer-data?objectType=${objectType}&id=${objectId}"
  },
  'Object Repository/Backend/Authentication/Impersonation/Impersonate User': {
    kind: 'api',
    method: 'GET',
    url: "${url}/ng-api/v2/account/impersonate?email=${email}"
  },
  'Object Repository/Backend/Authentication/Login/Api Login': {
    kind: 'api',
    method: 'POST',
    url: "${url}/ng-api/v2/account/login"
  },
  'Object Repository/Backend/Authentication/Login/Login Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='_submit' and contains(text(), 'Sign in')]"
    },
    selectors: [
      { type: 'CSS', value: "#_submit" },
      { type: 'XPATH', value: "//button[@id='_submit' and contains(text(), 'Sign in')]" },
    ]
  },
  'Object Repository/Backend/Authentication/Login/Login Password Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@name='password']"
    },
    selectors: [
      { type: 'CSS', value: "#password" },
      { type: 'XPATH', value: "//input[@name='password']" },
    ]
  },
  'Object Repository/Backend/Authentication/Login/Login Username Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@name='email']"
    },
    selectors: [
      { type: 'CSS', value: "#username" },
      { type: 'XPATH', value: "//input[@name='email']" },
    ]
  },
  'Object Repository/Backend/Authentication/Logout/Logout Link': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@href=\"${url}/logout\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@href=\"${url}/logout\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Authentication/Reset Password/Reset Password Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"reset-password-btn\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//button[@id=\"reset-password-btn\"]" },
    ]
  },
  'Object Repository/Backend/Authentication/Reset Password/Reset Password Email Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"reset_password_request_form_email\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@id=\"reset_password_request_form_email\"]" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Listing Page/Client Name Filter Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"filter_name_value\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id=\"filter_name_value\"]" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Listing Page/Edit Client Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//tr[contains(.,'${clientName}')]/td//a[contains(@href, '/admin/app/client/') and @title = 'Edit']"
    },
    selectors: [
      { type: 'CSS', value: "a.btn.btn-sm.btn-default.edit_link" },
      { type: 'XPATH', value: "//tr[contains(.,'${clientName}')]/td//a[contains(@href, '/admin/app/client/') and @title = 'Edit']" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Account Delivery Optimization Enabled Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Account Delivery Optimization Enabled?*\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Account Delivery Optimization Enabled?*\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Account Managers/Account Manager Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Account Managers\"]//following::div)[1]//table//tbody//tr//td[2]//select"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[text()=\"Account Managers\"]//following::div)[1]//table//tbody//tr//td[2]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Account Managers/Add New': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Account Managers\"]//following::div)[1]//a"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[text()=\"Account Managers\"]//following::div)[1]//a" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Account Managers/Default Account Manager Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Account Managers\"]//following::div)[1]//table//tbody//tr//td[3]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[text()=\"Account Managers\"]//following::div)[1]//table//tbody//tr//td[3]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Ad Server Multiselect': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Ad Server(s) (hold CTRL + click to select multiple\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Ad Server(s) (hold CTRL + click to select multiple\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Billing Profiles/Add New': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//a"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//a" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Billing Profiles/Billing Address Line One Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[6]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[6]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Billing Profiles/Billing Address Line Two Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[7]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[7]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Billing Profiles/Billing City Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[8]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[8]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Billing Profiles/Billing Country Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[10]//select"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[10]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Billing Profiles/Billing Email Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[5]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[5]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Billing Profiles/Billing Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[3]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[3]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Billing Profiles/Billing Phone Number Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[4]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[4]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Billing Profiles/Billing State Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[9]//select"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[9]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Billing Profiles/Billing Zip Code Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[11]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[11]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Billing Profiles/Contact Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[2]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[text()=\"Billing Profiles\"]//following::div)[1]//table//tbody//tr//td[2]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Client Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Name\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Name\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Client Tier Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Tier\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Tier\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Customer Success Managers/Add New': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Customer Success Managers\"]//following::div)[1]//a"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[text()=\"Customer Success Managers\"]//following::div)[1]//a" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Customer Success Managers/Customer Success Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Customer Success Managers\"]//following::div)[1]//table//tbody//tr//td[2]//select"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[text()=\"Customer Success Managers\"]//following::div)[1]//table//tbody//tr//td[2]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Customer Success Managers/Primary Customer Success Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Customer Success Managers\"]//following::div)[1]//table//tbody//tr//td[3]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[text()=\"Customer Success Managers\"]//following::div)[1]//table//tbody//tr//td[3]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/DPM CPM Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"DPM CPM\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"DPM CPM\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Expose Liveramp Audience List Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Expose Liveramp Audience List and Entry?\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Expose Liveramp Audience List and Entry?\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Expose Segment Builder Blacklist Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Expose Blacklist Dropdown on Segment Builder\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Expose Blacklist Dropdown on Segment Builder\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Is Active Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Is Active\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Is Active\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Liveramp Notification Emails Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Liveramp Notification C C Emails\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Liveramp Notification C C Emails\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/SSO Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"SSO (Login via Google) Setting\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"SSO (Login via Google) Setting\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Sales Persons/Add New': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Sales Persons\"]//following::div)[1]//a"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[text()=\"Sales Persons\"]//following::div)[1]//a" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Sales Persons/Default Sales Person Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Sales Persons\"]//following::div)[1]//table//tbody//tr//td[3]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[text()=\"Sales Persons\"]//following::div)[1]//table//tbody//tr//td[3]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Sales Persons/Sales Rep Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"Sales Persons\"]//following::div)[1]//table//tbody//tr//td[2]//select"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[text()=\"Sales Persons\"]//following::div)[1]//table//tbody//tr//td[2]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Salesforce Account ID Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Salesforce Account ID\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Salesforce Account ID\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Target Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Target\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Target\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Type Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Type\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Type\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/API Limit Override Settings Tab/Daily Segment Builder Search Limit Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Import Duns Number Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Import Duns Number Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/API Limit Override Settings Tab/Duns Blacklist Max Count Limit Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Import Duns Number Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Import Duns Number Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/API Limit Override Settings Tab/Import Customer Match Limit Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: null,
    selectors: [
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/API Limit Override Settings Tab/Import Duns Number Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Import Duns Number Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Import Duns Number Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/API Limit Override Settings Tab/Import Ip Address Ranges Limit Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Import Ip Address Ranges Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Import Ip Address Ranges Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/API Limit Override Settings Tab/Import Liveramp Limit Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Import Liveramp Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Import Liveramp Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/API Limit Override Settings Tab/Import Naics Limit': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Import Naics Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Import Naics Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/API Limit Override Settings Tab/Import Orb Webdomain Limit Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Import Orb Webdomain Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Import Orb Webdomain Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/API Limit Override Settings Tab/Import Organization Limit Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Import Organization Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Import Organization Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/API Limit Override Settings Tab/Import Physical Address Limit Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Import Physical Address Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Import Physical Address Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/API Limit Override Settings Tab/Import Sic Limit': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Import Sic Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Import Sic Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/API Limit Override Settings Tab/Import Single Ip Addresses Limit Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Import Single Ip Addresses Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Import Single Ip Addresses Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/API Limit Override Settings Tab/Import Third Party User Id Limit Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Import Third Party User Id Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Import Third Party User Id Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/API Limit Override Settings Tab/Naics Blacklist Max Count Limit Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Naics Blacklist Max Count Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Naics Blacklist Max Count Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/API Limit Override Settings Tab/Public Company Id Blacklist Max Count Limit Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Public Company Id Blacklist Max Count Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Public Company Id Blacklist Max Count Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/API Limit Override Settings Tab/Total Company Results Limit Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Naics Blacklist Max Count Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Naics Blacklist Max Count Limit\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/AppNexus Settings/Auto Create Advertiser Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Auto Create Advertiser and base templates in Appnexus?\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Auto Create Advertiser and base templates in Appnexus?\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/Billing Tab/Delinquent Flag Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Delinquent Flag\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Delinquent Flag\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Clients/Client Tabs/Client Settings Headers': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//h4[normalize-space(text())=\"${clientHeader}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//h4[normalize-space(text())=\"${clientHeader}\"]" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Common/Actions Menu': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[normalize-space(text())='Actions']"
    },
    selectors: [
      { type: 'XPATH', value: "//a[normalize-space(text())='Actions']" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Common/Add New': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[normalize-space(text())='Add new']"
    },
    selectors: [
      { type: 'XPATH', value: "//a[normalize-space(text())='Add new']" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Common/Create and Return to List Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[normalize-space(.)=\"Create and return to list\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[normalize-space(.)=\"Create and return to list\"]" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Common/Submit Filters Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[text()=\"Filter\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[text()=\"Filter\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Common/Update and Close Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[normalize-space(.)=\"Update and close\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[normalize-space(.)=\"Update and close\"]" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Users/Create Update/Client Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Client\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Client\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Users/Create Update/DPM Account Manager Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"DPM Account Manager\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"DPM Account Manager\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Users/Create Update/DPM Planning Team Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"DPM Planning Team\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"DPM Planning Team\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Users/Create Update/DPM Sales Person Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"DPM Sales Person\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"DPM Sales Person\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Users/Create Update/Email Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Email\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Email\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Users/Create Update/First Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"First Name Input\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"First Name Input\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Users/Create Update/Groups Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"DPM Sales Person\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"DPM Sales Person\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Users/Create Update/Last Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Last Name\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Last Name\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Users/Create Update/Password Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"Password\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"Password\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//input" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Users/Create Update/User Status Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[normalize-space(text())=\"User Status\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//label[normalize-space(text())=\"User Status\"]/following::div[contains(@class, \"sonata-ba-field\")])[1]//select" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Users/Listing Page/Edit User Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//tr[contains(.,'${existingEmail}')]/td//a[contains(@href, '/admin/app/user/') and @title = 'Edit']"
    },
    selectors: [
      { type: 'XPATH', value: "//tr[contains(.,'${existingEmail}')]/td//a[contains(@href, '/admin/app/user/') and @title = 'Edit']" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Backend Admin/Users/Listing Page/Email Filter Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"filter_email_value\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"filter_email_value\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Common/Grid/Add Filter Input Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[text()=\"${columnName}\"]/following-sibling::div[contains(@class, 'control-filters')]//button[contains(@class, 'grid-filter-add-input')]"
    },
    selectors: [
      { type: 'XPATH', value: "//label[text()=\"${columnName}\"]/following-sibling::div[contains(@class, 'control-filters')]//button[contains(@class, 'grid-filter-add-input')]" },
    ]
  },
  'Object Repository/Backend/Common/Grid/Apply Filter Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@value='Apply Filters' and @type = 'submit']"
    },
    selectors: [
      { type: 'CSS', value: "input.grid-search-submit.btn.btn-xs.btn-success.pull-left" },
      { type: 'XPATH', value: "//input[@value='Apply Filters' and @type = 'submit']" },
    ]
  },
  'Object Repository/Backend/Common/Grid/Column Filter Dropdown Item': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='filter-toolbar']//a[@href = '#' and (text() = '${filterSelection}' or . = '${filterSelection}')]"
    },
    selectors: [
      { type: 'BASIC', value: "//*[@href = '#' and (text() = 'AP Line Item ID' or . = 'AP Line Item ID')]" },
      { type: 'XPATH', value: "//div[@id='filter-toolbar']//a[@href = '#' and (text() = '${filterSelection}' or . = '${filterSelection}')]" },
    ]
  },
  'Object Repository/Backend/Common/Grid/Column Filter Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='filter-toolbar']/div/div/button"
    },
    selectors: [
      { type: 'BASIC', value: "//*[@type = 'button' and (text() = '\n                                Select… \n                            ' or . = '\n                                Select… \n                            ')]" },
      { type: 'CSS', value: "button.btn.btn-default.dropdown-toggle" },
      { type: 'XPATH', value: "//div[@id='filter-toolbar']/div/div/button" },
    ]
  },
  'Object Repository/Backend/Common/Grid/Delete Filter Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"${columnName}\"]/following-sibling::div[contains(@class, 'control-filters')]//span[contains(@class, 'grid-filter-input-query')]//div[contains(@class, 'grid-filter-box')])//span[contains(@class, 'remove-input')]"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[text()=\"${columnName}\"]/following-sibling::div[contains(@class, 'control-filters')]//span[contains(@class, 'grid-filter-input-query')]//div[contains(@class, 'grid-filter-box')])//span[contains(@class, 'remove-input')]" },
    ]
  },
  'Object Repository/Backend/Common/Grid/Filter Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"${columnName}\"]/following-sibling::div[contains(@class, 'control-filters')]//span[contains(@class, 'grid-filter-select-query')])//select"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[text()=\"${columnName}\"]/following-sibling::div[contains(@class, 'control-filters')]//span[contains(@class, 'grid-filter-select-query')])//select" },
    ]
  },
  'Object Repository/Backend/Common/Grid/Filter Operator': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[text()=\"${columnName}\"]/following-sibling::div[contains(@class, 'control-filters')]//span[contains(@class, 'grid-filter-operator')]//select"
    },
    selectors: [
      { type: 'XPATH', value: "//label[text()=\"${columnName}\"]/following-sibling::div[contains(@class, 'control-filters')]//span[contains(@class, 'grid-filter-operator')]//select" },
    ]
  },
  'Object Repository/Backend/Common/Grid/Relative Operator Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[text()=\"${columnName}\"]/following-sibling::div[contains(@class, 'control-filters')]//select[contains(@class, 'relative-operators')]"
    },
    selectors: [
      { type: 'XPATH', value: "//label[text()=\"${columnName}\"]/following-sibling::div[contains(@class, 'control-filters')]//select[contains(@class, 'relative-operators')]" },
    ]
  },
  'Object Repository/Backend/Common/Grid/Reset Filter Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@type = 'button' and @value='Reset Filters']"
    },
    selectors: [
      { type: 'CSS', value: "input.grid-search-reset.btn.btn-xs.btn-danger.pull-left" },
      { type: 'XPATH', value: "//input[@type = 'button' and @value='Reset Filters']" },
    ]
  },
  'Object Repository/Backend/Common/Grid/Specific Date Datepicker': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[text()=\"${columnName}\"]/following-sibling::div[contains(@class, 'control-filters')]//span[contains(@data-type, 'relative-date-non-custom-inputs')]//input[2]"
    },
    selectors: [
      { type: 'XPATH', value: "//label[text()=\"${columnName}\"]/following-sibling::div[contains(@class, 'control-filters')]//span[contains(@data-type, 'relative-date-non-custom-inputs')]//input[2]" },
    ]
  },
  'Object Repository/Backend/Common/Modals/Save Changes Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[text()=\"Save changes\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//button[text()=\"Save changes\"]" },
    ]
  },
  'Object Repository/Backend/IP To Company Upload/Page_IP to Company Report/a_Submit Request': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='startFileUpload']"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id='startFileUpload']" },
      { type: 'CSS', value: "#startFileUpload" },
    ]
  },
  'Object Repository/Backend/IP To Company Upload/Page_IP to Company Report/button_IPFileAttachments_Upload': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='upload-button']"
    },
    selectors: [
      { type: 'CSS', value: "#upload-button" },
      { type: 'XPATH', value: "//button[@id='upload-button']" },
    ]
  },
  'Object Repository/Backend/IP To Company Upload/Page_IP to Company Report/button_IPFile_AddNewAttachment': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@data-type=\"addNewAttachment\"]"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-xs.btn-inline.btn-primary" },
      { type: 'XPATH', value: "//button[@data-type=\"addNewAttachment\"]" },
    ]
  },
  'Object Repository/Backend/IP To Company Upload/Page_IP to Company Report/div_Drop files here to upload              _14ce81': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='fineUploader']/div"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='fineUploader']/div" },
      { type: 'CSS', value: "div.qq-uploader-selector.qq-uploader" },
    ]
  },
  'Object Repository/Backend/IP To Company Upload/Page_IP to Company Report/div_Select File': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='fineUploader']/div/ul/li/div"
    },
    selectors: [
      { type: 'CSS', value: "div.qq-upload-button-selector.btn-primary.btn.bootstrap-demo-button.btn-info" },
      { type: 'XPATH', value: "//div[@id='fineUploader']/div/ul/li/div" },
    ]
  },
  'Object Repository/Backend/IP To Company Upload/Page_IP to Company Report/input_FileAttachments_NameDescription': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='upload-description']"
    },
    selectors: [
      { type: 'CSS', value: "#upload-description" },
      { type: 'XPATH', value: "//input[@id='upload-description']" },
    ]
  },
  'Object Repository/Backend/IP To Company Upload/Page_IP to Company Report/input_IPFileAttachments_SelectFile': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@type='file' and @name='qqfile']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@type='file' and @name='qqfile']" },
    ]
  },
  'Object Repository/Backend/IP To Company Upload/Page_IP to Company Report/input_Select File_qqfile': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@name='qqfile']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@name='qqfile']" },
      { type: 'CSS', value: "input[name=\"qqfile\"]" },
    ]
  },
  'Object Repository/Backend/IP To Company Upload/Page_IP to Company Report/select_DB Concise                    DB Exp_c54deb': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='reportType']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='reportType']" },
      { type: 'CSS', value: "#reportType" },
    ]
  },
  'Object Repository/Backend/IP To Company Upload/Page_IP to Company Report/select_FileAttachments_Category': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='category-dropdown']"
    },
    selectors: [
      { type: 'CSS', value: "#category-dropdown" },
      { type: 'XPATH', value: "//select[@id='category-dropdown']" },
    ]
  },
  'Object Repository/Backend/IP To Company Upload/Page_IP to Company Report/select_Reportype': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='reportType']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='reportType']" },
      { type: 'CSS', value: "#reportType" },
    ]
  },
  'Object Repository/Backend/Navbar/Admin Menu Item': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[contains(@class, 'navbar')]//ul[2]//li[2]//li//a[normalize-space(.)=\"${menuItem}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//div[contains(@class, 'navbar')]//ul[2]//li[2]//li//a[normalize-space(.)=\"${menuItem}\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Navbar/Admin Menu': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id=\"admin-menu\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id=\"admin-menu\"]" },
    ]
  },
  'Object Repository/Backend/Navbar/Exit Impersonate User': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//li[contains(@class, 'exit-user')]"
    },
    selectors: [
      { type: 'XPATH', value: "//li[contains(@class, 'exit-user')]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/ColumnFilters/i_OpsDashboard_ColumnFilter_CloseAdditionalInput': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//span[@class='grid-filter-boxes']//span[@class='remove-input']/i[@class='ion-close-circled'])[${inputIndex}]"
    },
    selectors: [
      { type: 'CSS', value: "span.remove-input > i.ion-close-circled" },
      { type: 'XPATH', value: "(//span[@class='grid-filter-boxes']//span[@class='remove-input']/i[@class='ion-close-circled'])[${inputIndex}]" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/ColumnFilters/i_OpsDashboard_ColumnFilter_RemoveFilter': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//i[@class='ion-close-circled remove-filter'])[${filterIndex}]"
    },
    selectors: [
      { type: 'CSS', value: "" },
      { type: 'XPATH', value: "(//i[@class='ion-close-circled remove-filter'])[${filterIndex}]" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/ColumnFilters/input_OpsDashboard_ColumnFilter_AdditionalInput': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "((//label[@class='control-label' and text()='${filterColumn}']/parent::*)//span[@class='grid-filter-boxes']//div[@class='grid-filter-box']//input[contains(@class,'grid-filter-input-query-from')])[${inputIndex}]"
    },
    selectors: [
      { type: 'CSS', value: "span.grid-filter-boxes > div.grid-filter-box > input[name=\"grid_4bec3b94820cffd19f9297983491109b[thirdPartyAdServer][from][]\"]" },
      { type: 'XPATH', value: "((//label[@class='control-label' and text()='${filterColumn}']/parent::*)//span[@class='grid-filter-boxes']//div[@class='grid-filter-box']//input[contains(@class,'grid-filter-input-query-from')])[${inputIndex}]" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/ColumnFilters/input_OpsDashboard_ColumnFilter_From': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[@class='control-label' and text()='${filterColumn}']/parent::*)//input[contains(@id, '__query__from')]"
    },
    selectors: [
      { type: 'CSS', value: "#grid_4bec3b94820cffd19f9297983491109b__adjusterImpressionsLeft__query__from" },
      { type: 'XPATH', value: "(//label[@class='control-label' and text()='${filterColumn}']/parent::*)//input[contains(@id, '__query__from')]" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/ColumnFilters/input_OpsDashboard_ColumnFilter_To': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[@class='control-label' and text()='${filterColumn}']/parent::*)//input[contains(@id, '__query__to')]"
    },
    selectors: [
      { type: 'CSS', value: "#grid_4bec3b94820cffd19f9297983491109b__adjusterPacingIndicator__query__to" },
      { type: 'XPATH', value: "(//label[@class='control-label' and text()='${filterColumn}']/parent::*)//input[contains(@id, '__query__to')]" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/ColumnFilters/select_OpsDashboard_ColumnFilters_LineItemNameCriteria': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[@class='control-label' and text()='${filterColumn}']/parent::*)//span[@class='grid-filter-operator']//select"
    },
    selectors: [
      { type: 'CSS', value: "select[name=\"grid_4bec3b94820cffd19f9297983491109b[name][operator]\"]" },
      { type: 'XPATH', value: "(//label[@class='control-label' and text()='${filterColumn}']/parent::*)//span[@class='grid-filter-operator']//select" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/ColumnFilters/select_OpsDashboard_ColumnFilters_SelectRelativeOperator': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[@class='control-label' and text()='${filterColumn}']/parent::*)//select[@class='form-control grid-filter-input-query-from relative-operators']"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[@class='control-label' and text()='${filterColumn}']/parent::*)//select[@class='form-control grid-filter-input-query-from relative-operators']" },
      { type: 'CSS', value: "select[name=\"grid_4bec3b94820cffd19f9297983491109b[apEndDate][from]\"]" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/Line Item Columns/AP Daily Budget/AP Daily Budget Span': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='DAILY_BUDGET_NEW_VALUE']//span[@class='edit-cell-value']"
    },
    selectors: [
      { type: 'CSS', value: "tr.grid-row-cells.odd > td.grid-column-apDailyBudget.align-right > div.ops-dash-edit-cell-area > div.ops-edit-cell-value-area > span.edit-cell-value" },
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='DAILY_BUDGET_NEW_VALUE']//span[@class='edit-cell-value']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/Line Item Columns/Has Notes/Has Notes Modal Close Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='notesModal']/div/div/div[3]/button"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='notesModal']/div/div/div[3]/button" },
      { type: 'CSS', value: "div.modal-content > div.modal-footer > button.btn" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/Line Item Columns/Has Notes/Has Notes Modal Link': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[3]/div/a/i"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[3]/div/a/i" },
      { type: 'CSS', value: "i.ion-edit" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/Line Item Columns/Has Notes/Has Notes Modal Textarea': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@name='note']"
    },
    selectors: [
      { type: 'XPATH', value: "//textarea[@name='note']" },
      { type: 'CSS', value: "textarea[name=\"note\"]" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/Line Item Columns/Has Notes/Save Note Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='saveNote']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='saveNote']" },
      { type: 'CSS', value: "#saveNote" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/Line Item Columns/Has Notes/User Notes Table Note Column TD': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='notesModal']//table//td[text()='${userNotes}']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='notesModal']//table//td[text()='${userNotes}']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/Line Item Columns/Pacing Percentage/Pacing Percentage TD': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action=\"PACING_PCT_NEW_VALUE\"]//span[@class=\"edit-cell-value\"]"
    },
    selectors: [
      { type: 'CSS', value: "td.grid-column-apLifeBudget.align-right > div.ops-dash-edit-cell-area > div.ops-edit-cell-value-area > span.edit-cell-value" },
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action=\"PACING_PCT_NEW_VALUE\"]//span[@class=\"edit-cell-value\"]" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/Line Item Columns/Resync/Sync Icon': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//span[@title='Line Item is being processed. Click to view change history']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//span[@title='Line Item is being processed. Click to view change history']" },
      { type: 'CSS', value: "svg.svg-inline--fa.fa-sync.fa-w-16" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/button_OpsDashboard_LineItemList_APDailyBudgetValue_Save': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='DAILY_BUDGET_NEW_VALUE']//button[@type='button']"
    },
    selectors: [
      { type: 'CSS', value: "tr.grid-row-cells.odd > td.grid-column-apDailyBudget.align-right > div.ops-dash-edit-cell-area > div.edit-cell-input-area > div.input-group > span.input-group-btn > button.edit-cell-submit-btn" },
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='DAILY_BUDGET_NEW_VALUE']//button[@type='button']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/button_OpsDashboard_LineItemList_APLifeBudgetValue_Save': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='XANDR_LIFE_BUDGET_NEW_VALUE']//button[@type='button']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='XANDR_LIFE_BUDGET_NEW_VALUE']//button[@type='button']" },
      { type: 'CSS', value: "tr.grid-row-cells.odd > td.grid-column-apDailyBudget.align-right > div.ops-dash-edit-cell-area > div.edit-cell-input-area > div.input-group > span.input-group-btn > button.edit-cell-submit-btn" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/button_OpsDashboard_LineItemList_PacingPercentage_Save': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='PACING_PCT_NEW_VALUE']//button[@type='button']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='PACING_PCT_NEW_VALUE']//button[@type='button']" },
      { type: 'CSS', value: "tr.grid-row-cells.odd > td.grid-column-apDailyBudget.align-right > div.ops-dash-edit-cell-area > div.edit-cell-input-area > div.input-group > span.input-group-btn > button.edit-cell-submit-btn" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/input_OpsDashboard_LineItemList_APDailyBudgetEdit': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='DAILY_BUDGET_NEW_VALUE']//div[@class='edit-cell-input-area']//input[@type='text']"
    },
    selectors: [
      { type: 'CSS', value: "tr.grid-row-cells.odd > td.grid-column-apDailyBudget.align-right > div.ops-dash-edit-cell-area > div.edit-cell-input-area > div.input-group > input.form-control" },
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='DAILY_BUDGET_NEW_VALUE']//div[@class='edit-cell-input-area']//input[@type='text']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/input_OpsDashboard_LineItemList_APLifeBudgetEdit': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='XANDR_LIFE_BUDGET_NEW_VALUE']//div[@class='edit-cell-input-area']//input[@type='text']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='XANDR_LIFE_BUDGET_NEW_VALUE']//div[@class='edit-cell-input-area']//input[@type='text']" },
      { type: 'CSS', value: "tr.grid-row-cells.odd > td.grid-column-apDailyBudget.align-right > div.ops-dash-edit-cell-area > div.edit-cell-input-area > div.input-group > input.form-control" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/input_OpsDashboard_LineItemList_Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]//td[1]//input"
    },
    selectors: [
      { type: 'CSS', value: "input[name=\"grid_4bec3b94820cffd19f9297983491109b[__action][106765]\"]" },
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]//td[1]//input" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/input_OpsDashboard_LineItemList_PacingPercentageEdit': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='PACING_PCT_NEW_VALUE']//div[@class='edit-cell-input-area']//input[@type='text']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='PACING_PCT_NEW_VALUE']//div[@class='edit-cell-input-area']//input[@type='text']" },
      { type: 'CSS', value: "tr.grid-row-cells.odd > td.grid-column-apDailyBudget.align-right > div.ops-dash-edit-cell-area > div.edit-cell-input-area > div.input-group > input.form-control" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/span_OpsDashboard_LineItemList_APLifeBudgetValue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action=\"XANDR_LIFE_BUDGET_NEW_VALUE\"]//span[@class=\"edit-cell-value\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action=\"XANDR_LIFE_BUDGET_NEW_VALUE\"]//span[@class=\"edit-cell-value\"]" },
      { type: 'CSS', value: "td.grid-column-apLifeBudget.align-right > div.ops-dash-edit-cell-area > div.ops-edit-cell-value-area > span.edit-cell-value" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/svg_OpsDashboard_LineItemList_APDailyBudget_EditButton': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='DAILY_BUDGET_NEW_VALUE']//span[@class='edit-cell-icon ']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='DAILY_BUDGET_NEW_VALUE']//span[@class='edit-cell-icon ']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/svg_OpsDashboard_LineItemList_APLifeBudget_EditButton': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='XANDR_LIFE_BUDGET_NEW_VALUE']//span[@class='edit-cell-icon ']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='XANDR_LIFE_BUDGET_NEW_VALUE']//span[@class='edit-cell-icon ']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/svg_OpsDashboard_LineItemList_PacingPercentage_EditButton': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='PACING_PCT_NEW_VALUE']//span[@class='edit-cell-icon ']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td//div[@data-action='PACING_PCT_NEW_VALUE']//span[@class='edit-cell-icon ']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/td_OpsDashboard_DayPart': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']//tbody//tr[contains(., '${lineItemName}')]//td[@class='grid-column-daypart last-row']"
    },
    selectors: [
      { type: 'CSS', value: "td.grid-column-daypart" },
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']//tbody//tr[contains(., '${lineItemName}')]//td[@class='grid-column-daypart last-row']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/td_OpsDashboard_FrequencyCap': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[@class='grid-column-frequencyCap last-row']"
    },
    selectors: [
      { type: 'CSS', value: "td.grid-column-frequencyCap" },
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[@class='grid-column-frequencyCap last-row']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/td_OpsDashboard_Goal': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[@class='grid-column-objectiveCoverage last-row']"
    },
    selectors: [
      { type: 'CSS', value: "td.grid-column-objectiveCoverage" },
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[@class='grid-column-objectiveCoverage last-row']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/td_OpsDashboard_GoalPriority': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[@class='grid-column-goalPriority last-row']"
    },
    selectors: [
      { type: 'CSS', value: "td.grid-column-goalPriority" },
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[@class='grid-column-goalPriority last-row']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/td_OpsDashboard_Objective': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[@class='grid-column-objectiveType last-row']"
    },
    selectors: [
      { type: 'CSS', value: "td.grid-column-objectiveType" },
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[@class='grid-column-objectiveType last-row']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/td_OpsDashboard_OptimizationEnabled': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[@class='grid-column-bidOptimization align-center last-row']//span[@title='${optimizationEnabled}']"
    },
    selectors: [
      { type: 'CSS', value: "td.grid-column-bidOptimization.align-center" },
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[@class='grid-column-bidOptimization align-center last-row']//span[@title='${optimizationEnabled}']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/td_OpsDashboard_OptimizationType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[@class='grid-column-goalType last-row']"
    },
    selectors: [
      { type: 'CSS', value: "td.grid-column-goalType" },
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[@class='grid-column-goalType last-row']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/td_OpsDashboard_OptimizationValue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[@class='grid-column-goalValue align-right last-row']"
    },
    selectors: [
      { type: 'CSS', value: "td.grid-column-goalValue.align-right" },
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[@class='grid-column-goalValue align-right last-row']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/td_OpsDashboard_ViewabilityThreshold': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[@class='grid-column-viewabilityThreshold last-row']"
    },
    selectors: [
      { type: 'CSS', value: "td.grid-column-viewabilityThreshold" },
      { type: 'XPATH', value: "//div[@data-grid-id='admin_ops_dashboard']//table[@data-type='grid-main-table']/tbody/tr[contains(., '${lineItemName}')]/td[@class='grid-column-viewabilityThreshold last-row']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/LineItemsList/th_OpsDashboard_LineItemList_APLifeBudgetColumn': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//th[(text() = 'AP Life Budget' or . = 'AP Life Budget')]"
    },
    selectors: [
      { type: 'CSS', value: "" },
      { type: 'XPATH', value: "//th[(text() = 'AP Life Budget' or . = 'AP Life Budget')]" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/MassAction/BudgetModificationForm/Adjuster Radio Option': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id=\"adjusterDpmSelect\"]//label[contains(text(),\"${labelName}\")]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//div[@id=\"adjusterDpmSelect\"]//label[contains(text(),\"${labelName}\")]//input" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/MassAction/BudgetModificationForm/Apply Mass Action Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='saveBudget']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='saveBudget']" },
      { type: 'CSS', value: "#saveBudget" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/MassAction/BudgetModificationForm/Daily Budget Radio Option': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//ul[@id=\"daily\"]//label[contains(text(),\"${labelName}\")]//input"
    },
    selectors: [
      { type: 'XPATH', value: "//ul[@id=\"daily\"]//label[contains(text(),\"${labelName}\")]//input" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/MassAction/BudgetModificationForm/Life Budget Radio Option': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//ul[@id=\"life\"]//label[contains(text(),\"${labelName}\")]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//ul[@id=\"life\"]//label[contains(text(),\"${labelName}\")]//input" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/MassAction/BudgetModificationForm/Pacing Percentage Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id=\"pacingNewValue\"]//input"
    },
    selectors: [
      { type: 'CSS', value: "input[name=\"pacingNewValue\"]" },
      { type: 'XPATH', value: "//div[@id=\"pacingNewValue\"]//input" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/MassAction/BudgetModificationForm/Pacing Percentage Radio Option': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//ul[@id=\"pacing\"]//label[contains(text(),\"Pacing Percentage > New Value\")]//input"
    },
    selectors: [
      { type: 'XPATH', value: "//ul[@id=\"pacing\"]//label[contains(text(),\"Pacing Percentage > New Value\")]//input" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/MassAction/BudgetModificationForm/Xandr Life Budget Multiplier Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id=\"xandrLifeBudget\"]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//div[@id=\"xandrLifeBudget\"]//input" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/MassAction/BudgetModificationForm/Xandr Life Buffer Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id=\"xandrLifeBuffer\"]//input"
    },
    selectors: [
      { type: 'CSS', value: "#life > li > label > input[name=\"adjustOptions\"]" },
      { type: 'XPATH', value: "//div[@id=\"xandrLifeBuffer\"]//input" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/MassAction/BudgetModificationForm/h3_OpsDashboard_MassAction_BudgetModificationForm': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//h3[@id = 'myModalLabel' and (text() = 'Budget Modification Form' or . = 'Budget Modification Form')]"
    },
    selectors: [
      { type: 'XPATH', value: "//h3[@id = 'myModalLabel' and (text() = 'Budget Modification Form' or . = 'Budget Modification Form')]" },
      { type: 'CSS', value: "#myModalLabel" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/MassAction/BudgetModificationForm/select_OpsDashboard_MassAction_BudgetModificationForm_AdjustBudgetBasedOn': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='budgetSelect']"
    },
    selectors: [
      { type: 'CSS', value: "#budgetSelect" },
      { type: 'XPATH', value: "//select[@id='budgetSelect']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/MassAction/button_OpsDashboard_MassAction_Remove': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='removeProfile']"
    },
    selectors: [
      { type: 'CSS', value: "#removeProfile" },
      { type: 'XPATH', value: "//button[@id='removeProfile']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/MassAction/input_OpsDashboard_MassAction_Submit': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@class='massactions-select grid_massactions grid_inline_block']//input[@value='Submit']"
    },
    selectors: [
      { type: 'CSS', value: "input.btn.btn-default.btn-xs" },
      { type: 'XPATH', value: "//div[@class='massactions-select grid_massactions grid_inline_block']//input[@value='Submit']" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/MassAction/select_OpsDashboard_MassAction_Selection': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[contains(@name, 'grid_') and contains(@name, '[__action_id]')]"
    },
    selectors: [
      { type: 'CSS', value: "select[name=\"grid_4bec3b94820cffd19f9297983491109b[__action_id]\"]" },
      { type: 'XPATH', value: "//select[contains(@name, 'grid_') and contains(@name, '[__action_id]')]" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/Ops Dashboard Filter Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"${columnName}\"]/following-sibling::div[contains(@class, 'control-filters')]//span[contains(@class, 'grid-filter-input-query')]//div[contains(@class, 'grid-filter-box')])[${index}]//input[contains(@class, 'grid-filter-input-query-from')]"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[text()=\"${columnName}\"]/following-sibling::div[contains(@class, 'control-filters')]//span[contains(@class, 'grid-filter-input-query')]//div[contains(@class, 'grid-filter-box')])[${index}]//input[contains(@class, 'grid-filter-input-query-from')]" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/Ops Dashboard Filter Loader': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//img[contains(@class, 'loader')]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//img[contains(@class, 'loader')]" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/Visible Columns Modal/Remove All Columns Visible Link': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//a[@data-type=\"deselect-all\"])[1]"
    },
    selectors: [
      { type: 'CSS', value: "a.select-deselect-all-columns" },
      { type: 'XPATH', value: "(//a[@data-type=\"deselect-all\"])[1]" },
      { type: 'BASIC', value: "//*[@href = '#' and (text() = 'All' or . = 'All')]" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/Visible Columns Modal/Select All Columns Visible Link': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[contains(@class, 'select-deselect-all-columns')]"
    },
    selectors: [
      { type: 'BASIC', value: "//*[@href = '#' and (text() = 'All' or . = 'All')]" },
      { type: 'CSS', value: "a.select-deselect-all-columns" },
      { type: 'XPATH', value: "//a[contains(@class, 'select-deselect-all-columns')]" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/Visible Columns Modal/Visible Columns Modal Searchbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"column-name-search\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"column-name-search\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/Visible Columns Modal/Visible Columns Modal Toggle': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@data-target=\"#gridVisibleColumnsModal\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@data-target=\"#gridVisibleColumnsModal\"]" },
      { type: 'CSS', value: "span.glyphicon.glyphicon-eye-open" },
    ]
  },
  'Object Repository/Backend/Ops Dashboard/Visible Columns Modal/Visible Columns Save Changes Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='submitColumnFormBtn']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='submitColumnFormBtn']" },
      { type: 'CSS', value: "#submitColumnFormBtn" },
    ]
  },
  'Object Repository/Backend/Product Release/Get Sprint Name': {
    kind: 'api',
    method: 'GET',
    url: "${url}/ng-api/v2/product-release/currentSprint"
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Agency Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='dpmaudience_deal_client']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='dpmaudience_deal_client']" },
      { type: 'CSS', value: "#dpmaudience_deal_client" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Apply Client To Deal Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='apply-client-to-deal']"
    },
    selectors: [
      { type: 'CSS', value: "#apply-client-to-deal" },
      { type: 'XPATH', value: "//input[@id='apply-client-to-deal']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Client Modal Close Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[text()='Close']"
    },
    selectors: [
      { type: 'CSS', value: "div.modal-footer > button.btn.btn-default" },
      { type: 'XPATH', value: "//button[text()='Close']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Create Client Modal Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"create-client-deal-form\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//button[@id=\"create-client-deal-form\"]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Create New Client Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[text() = 'Add New Client']"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-default" },
      { type: 'XPATH', value: "//button[text() = 'Add New Client']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Is Active Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='dpmaudience_deal_client_isActive']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_client_isActive" },
      { type: 'XPATH', value: "//input[@id='dpmaudience_deal_client_isActive']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='dpmaudience_deal_client_name']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_client_name" },
      { type: 'XPATH', value: "//input[@id='dpmaudience_deal_client_name']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Permission Group Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='dpmaudience_deal_client_permissionGroup']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_client_permissionGroup" },
      { type: 'XPATH', value: "//select[@id='dpmaudience_deal_client_permissionGroup']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Salesforce Account ID Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='dpmaudience_deal_client_salesforceAccountId']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_client_salesforceAccountId" },
      { type: 'XPATH', value: "//input[@id='dpmaudience_deal_client_salesforceAccountId']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Show Duns Number On Analytics Report Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='dpmaudience_deal_client_showNgApiDuns']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_client_showNgApiDuns" },
      { type: 'XPATH', value: "//select[@id='dpmaudience_deal_client_showNgApiDuns']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Target Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='dpmaudience_deal_client_target']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_client_target" },
      { type: 'XPATH', value: "//select[@id='dpmaudience_deal_client_target']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Type Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='dpmaudience_deal_client_type']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_client_type" },
      { type: 'XPATH', value: "//select[@id='dpmaudience_deal_client_type']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Relationship Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='dpmaudience_deal_clientRelationship']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_clientRelationship" },
      { type: 'XPATH', value: "//select[@id='dpmaudience_deal_clientRelationship']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Retention Status Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"dpmaudience_deal_retentionStatus\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id=\"dpmaudience_deal_retentionStatus\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Create Deal Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[contains(text(),'Create Deal')]"
    },
    selectors: [
      { type: 'CSS', value: "a.btn.btn-primary" },
      { type: 'XPATH', value: "//a[contains(text(),'Create Deal')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Advertiser Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='dpmaudience_deal_advertiserName']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_advertiserName" },
      { type: 'XPATH', value: "//input[@id='dpmaudience_deal_advertiserName']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Campaign Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='dpmaudience_deal_campaignName']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_campaignName" },
      { type: 'XPATH', value: "//input[@id='dpmaudience_deal_campaignName']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Contacts/Add Contact Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='dpmaudience_deal_primaryContacts_add']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_primaryContacts_add" },
      { type: 'XPATH', value: "//button[@id='dpmaudience_deal_primaryContacts_add']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Contacts/Contact Email Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='dpmaudience_deal_primaryContacts_${contactNo}_email']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_primaryContacts_0_email" },
      { type: 'XPATH', value: "//input[@id='dpmaudience_deal_primaryContacts_${contactNo}_email']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Contacts/Contact Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='dpmaudience_deal_primaryContacts_${contactNo}_name']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_primaryContacts_0_name" },
      { type: 'XPATH', value: "//input[@id='dpmaudience_deal_primaryContacts_${contactNo}_name']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/GeoTargeting iFrame': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//iframe[@id='dpmaudience_deal_geoTarget_ifr']"
    },
    selectors: [
      { type: 'XPATH', value: "//iframe[@id='dpmaudience_deal_geoTarget_ifr']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/KPI Notes': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//iframe[@id=\"dpmaudience_deal_kpiNotes_ifr\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//iframe[@id=\"dpmaudience_deal_kpiNotes_ifr\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/KPI Objectives Multiselect': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='dpmaudience_deal_kpiObjectives']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_kpiObjectives" },
      { type: 'XPATH', value: "//select[@id='dpmaudience_deal_kpiObjectives']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Products Of Interest Multiselect': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='dpmaudience_deal_productsOfInterest']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_productsOfInterest" },
      { type: 'XPATH', value: "//select[@id='dpmaudience_deal_productsOfInterest']" },
      { type: 'BASIC', value: "//*[@id = 'dpmaudience_deal_productsOfInterest' and @name = 'dpmaudience_deal[productsOfInterest][]' and (text() = 'ABM ProductClient Data OnboardingOffline Data TargetingAudience Extension' or . = 'ABM ProductClient Data OnboardingOffline Data TargetingAudience Extension')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/RFP Notes Textarea': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id=\"dpmaudience_deal_salesNotes\"]"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_salesNotes" },
      { type: 'XPATH', value: "//textarea[@id=\"dpmaudience_deal_salesNotes\"]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Rev Ops Person Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='dpmaudience_deal_revOpsPerson' and @name='dpmaudience_deal[revOpsPerson]']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='dpmaudience_deal_revOpsPerson' and @name='dpmaudience_deal[revOpsPerson]']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Sales Person Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='dpmaudience_deal_salesPerson']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_salesPerson" },
      { type: 'XPATH', value: "//select[@id='dpmaudience_deal_salesPerson']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Target Audience iFrame': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//iframe[@id='dpmaudience_deal_targetAudience_ifr']"
    },
    selectors: [
      { type: 'XPATH', value: "//iframe[@id='dpmaudience_deal_targetAudience_ifr']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/p_DealInformation_TargetAudience': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//body/p"
    },
    selectors: [
      { type: 'XPATH', value: "//body/p" },
      { type: 'CSS', value: "#dpmaudience_deal_targetAudience" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/PMP Information/PMP Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"dpmaudience_deal_isPmp\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@id=\"dpmaudience_deal_isPmp\"]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/PMP Information/Price Model Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"dpmaudience_deal_marginTypeSold\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//select[@id=\"dpmaudience_deal_marginTypeSold\"]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Revenue Splits/Add Revenue Split Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@data-provide=\"addRevenueSplit\"][${index}]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@data-provide=\"addRevenueSplit\"][${index}]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Revenue Splits/Remove Revenue Split Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[contains(@class, 'remove-split')]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[contains(@class, 'remove-split')]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Revenue Splits/Sales Person Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"dpmaudience_deal_revenueSplits_${index}_salesPerson\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id=\"dpmaudience_deal_revenueSplits_${index}_salesPerson\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Revenue Splits/Split Percentage Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"dpmaudience_deal_revenueSplits_${index}_splitPercentage\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"dpmaudience_deal_revenueSplits_${index}_splitPercentage\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Save Deal Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@type='submit' and @value='Save']"
    },
    selectors: [
      { type: 'CSS', value: "input.btn.btn-primary.save-deal" },
      { type: 'XPATH', value: "//input[@type='submit' and @value='Save']" },
      { type: 'BASIC', value: "//*[@type = 'submit']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Budget Calculator Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_budget\"]/following-sibling::span[@id=\"budget-calc\"]//button"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_budget\"]/following-sibling::span[@id=\"budget-calc\"]//button" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Budget Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_budget\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_budget\"]" },
      { type: 'CSS', value: "#dpmaudience_deal_salesForecastSubdeals_0_budget" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/CPM Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_cpm\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_cpm\"]" },
      { type: 'CSS', value: "#dpmaudience_deal_salesForecastSubdeals_0_cpm" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Category Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_target']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_target']" },
      { type: 'CSS', value: "#dpmaudience_deal_salesForecastSubdeals_0_target" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Create Order Link': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//td[contains(@class, 'id-column')])[${index}]//following-sibling::td[contains(@class, 'newOrder-column')]//a"
    },
    selectors: [
      { type: 'XPATH', value: "(//td[contains(@class, 'id-column')])[${index}]//following-sibling::td[contains(@class, 'newOrder-column')]//a" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Create Subdeal Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='create-subdeal-btn']"
    },
    selectors: [
      { type: 'CSS', value: "#create-subdeal-btn" },
      { type: 'XPATH', value: "//button[@id='create-subdeal-btn']" },
      { type: 'IMAGE', value: "Screenshots/Targets/Page_AdDaptive Intelligence  Welcome/button_Create Subdeal.png" },
      { type: 'BASIC', value: "//*[@type = 'button' and @id = 'create-subdeal-btn' and (text() = 'Create Subdeal' or . = 'Create Subdeal')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/End Date Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_endDate\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_endDate\"]" },
      { type: 'CSS', value: "#dpmaudience_deal_salesForecastSubdeals_0_endDate" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/GeoTargeting iFrame': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//iframe[@id='dpmaudience_deal_salesForecastSubdeals_${index}_geoTarget_ifr']"
    },
    selectors: [
      { type: 'XPATH', value: "//iframe[@id='dpmaudience_deal_salesForecastSubdeals_${index}_geoTarget_ifr']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Impression Goal Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_impressionGoal\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_impressionGoal\"]" },
      { type: 'CSS', value: "#dpmaudience_deal_salesForecastSubdeals_0_impressionGoal" },
      { type: 'BASIC', value: "//*[@type = 'number' and @id = 'dpmaudience_deal_salesForecastSubdeals_0_impressionGoal' and @name = 'dpmaudience_deal[salesForecastSubdeals][0][impressionGoal]']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Mass Update/Activate Mass Action Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='activate-mass-action']"
    },
    selectors: [
      { type: 'CSS', value: "#activate-mass-action" },
      { type: 'XPATH', value: "//button[@id='activate-mass-action']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Mass Update/Fields Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='mass-update-field-menu']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='mass-update-field-menu']" },
      { type: 'CSS', value: "#mass-update-field-menu" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Mass Update/Fields/Category Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"target-input\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id=\"target-input\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Mass Update/Fields/End Date Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='endDate-input']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='endDate-input']" },
      { type: 'CSS', value: "#dpmaudience_deal_salesForecastSubdeals_0_startDate" },
      { type: 'BASIC', value: "//*[@type = 'text' and @id = 'dpmaudience_deal_salesForecastSubdeals_0_startDate' and @name = 'dpmaudience_deal[salesForecastSubdeals][0][startDate]']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Mass Update/Fields/Impression Goal Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='impressionGoal-input']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='impressionGoal-input']" },
      { type: 'CSS', value: "#dpmaudience_deal_salesForecastSubdeals_0_startDate" },
      { type: 'BASIC', value: "//*[@type = 'text' and @id = 'dpmaudience_deal_salesForecastSubdeals_0_startDate' and @name = 'dpmaudience_deal[salesForecastSubdeals][0][startDate]']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Mass Update/Fields/Media Type Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"mediaType-input\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id=\"mediaType-input\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Mass Update/Fields/Start Date Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='startDate-input']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='startDate-input']" },
      { type: 'CSS', value: "#dpmaudience_deal_salesForecastSubdeals_0_startDate" },
      { type: 'BASIC', value: "//*[@type = 'text' and @id = 'dpmaudience_deal_salesForecastSubdeals_0_startDate' and @name = 'dpmaudience_deal[salesForecastSubdeals][0][startDate]']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Mass Update/Mass Action Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='mass-update-action-menu']"
    },
    selectors: [
      { type: 'CSS', value: "#mass-update-action-menu" },
      { type: 'XPATH', value: "//select[@id='mass-update-action-menu']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Mass Update/Source Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='mass-update-source-menu']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='mass-update-source-menu']" },
      { type: 'CSS', value: "#mass-update-source-menu" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Mass Update/select_SubDeals_MassUpdate_MediaType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='mediaType-input']"
    },
    selectors: [
      { type: 'CSS', value: "#mass-update-field-menu" },
      { type: 'XPATH', value: "//select[@id='mediaType-input']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Media Type Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_mediaType\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_mediaType\"]" },
      { type: 'CSS', value: "#mass-update-field-menu" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Non Billable Type Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"dpmaudience_deal_salesForecastSubdeals_0_nonBillableType\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//select[@id=\"dpmaudience_deal_salesForecastSubdeals_0_nonBillableType\"]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/PMP Expected Budget': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_expectedBudget\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_expectedBudget\"]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Quoted CPM': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_quotedCpm\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_quotedCpm\"]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Start Date Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_startDate\"]"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_salesForecastSubdeals_0_startDate" },
      { type: 'XPATH', value: "//input[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_startDate\"]" },
      { type: 'BASIC', value: "//*[@type = 'text' and @id = 'dpmaudience_deal_salesForecastSubdeals_0_startDate' and @name = 'dpmaudience_deal[salesForecastSubdeals][0][startDate]']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/input_SubDeals_SelectionCheckbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//div[@id='dpmaudience_deal_salesForecastSubdeals']//div[@class='subdeal-slot' and not(contains(@style, 'display: none'))])[${subDealIndex}]//input[@type='checkbox']"
    },
    selectors: [
      { type: 'XPATH', value: "(//div[@id='dpmaudience_deal_salesForecastSubdeals']//div[@class='subdeal-slot' and not(contains(@style, 'display: none'))])[${subDealIndex}]//input[@type='checkbox']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/p_SubDeals_GeoTargeting': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//body[@data-id='dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_geoTarget']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_geoTarget" },
      { type: 'XPATH', value: "//body[@data-id='dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_geoTarget']" },
      { type: 'BASIC', value: "//*[@id = 'dpmaudience_deal_geoTarget' and @name = 'dpmaudience_deal[geoTarget]']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/textarea_SubDeals_Description': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_category\"]"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_salesForecastSubdeals_0_category" },
      { type: 'XPATH', value: "//textarea[@id=\"dpmaudience_deal_salesForecastSubdeals_${subDealIndex}_category\"]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Sales Listing Page/Columns/DSP': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//td[contains(@class, 'grid-column-dsp')])[${index}]"
    },
    selectors: [
      { type: 'XPATH', value: "(//td[contains(@class, 'grid-column-dsp')])[${index}]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Sales Listing Page/Columns/ID': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//td[contains(@class, 'grid-column-id ')]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//td[contains(@class, 'grid-column-id ')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Sales Listing Page/Create a Deal Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[text()=\"Create a Deal\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[text()=\"Create a Deal\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Sales Listing Page/Export Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@value='Export']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@value='Export']" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Sales Listing Page/Nav Tab': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[contains(@class, 'deals-container')]//ul[contains(@class, 'filter-nav')]//a[text()=\"${tabName}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//div[contains(@class, 'deals-container')]//ul[contains(@class, 'filter-nav')]//a[text()=\"${tabName}\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Sales Listing Page/Sales Dashboard Filter Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[text()=\"${columnName}\"]/following-sibling::div[contains(@class, 'control-filters')]//span[contains(@class, 'grid-filter-input-query')][1]//input[contains(@class, 'grid-filter-input-query-from')])"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[text()=\"${columnName}\"]/following-sibling::div[contains(@class, 'control-filters')]//span[contains(@class, 'grid-filter-input-query')][1]//input[contains(@class, 'grid-filter-input-query-from')])" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Billing Details/Address Line One Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='new_client_billing_profile_addressLineOne']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='new_client_billing_profile_addressLineOne']" },
      { type: 'BASIC', value: "//*[@type = 'text' and @id = 'dpmaudience_deal_closewon_billingDetails_billingAddress' and @name = 'dpmaudience_deal_closewon[billingDetails][billingAddress]']" },
      { type: 'CSS', value: "#dpmaudience_deal_closewon_billingDetails_billingAddress" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Billing Details/Address Line Two Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='new_client_billing_profile_addressLineTwo']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='new_client_billing_profile_addressLineTwo']" },
      { type: 'BASIC', value: "//*[@type = 'text' and @id = 'dpmaudience_deal_closewon_billingDetails_billingAddress' and @name = 'dpmaudience_deal_closewon[billingDetails][billingAddress]']" },
      { type: 'CSS', value: "#dpmaudience_deal_closewon_billingDetails_billingAddress" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Billing Details/Billing Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='new_client_billing_profile_billingName']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='new_client_billing_profile_billingName']" },
      { type: 'CSS', value: "#dpmaudience_deal_closewon_billingDetails_billingName" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Billing Details/Billing Source Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"dpmaudience_deal_closewon_adServer\"]"
    },
    selectors: [
      { type: 'BASIC', value: "//*[@id = 'billingSourceSelect' and (text() = '\n                                                                                                                                                                                                                                AdDaptive\n                                                                                                                                                                                                                                                                                                                                                DFP\n                                                                                                                                                                                                                                                                                                                                                OAS\n                                                                                                                                                                                                                                                                                                                                                Third Party\n                                                                                                                                                                                                              ' or . = '\n                                                                                                                                                                                                                                AdDaptive\n                                                                                                                                                                                                                                                                                                                                                DFP\n                                                                                                                                                                                                                                                                                                                                                OAS\n                                                                                                                                                                                                                                                                                                                                                Third Party\n                                                                                                                                                                                                              ')]" },
      { type: 'XPATH', value: "//select[@id=\"dpmaudience_deal_closewon_adServer\"]" },
      { type: 'CSS', value: "#billingSourceSelect" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Billing Details/City Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='new_client_billing_profile_city']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='new_client_billing_profile_city']" },
      { type: 'BASIC', value: "//*[@type = 'text' and @id = 'dpmaudience_deal_closewon_billingDetails_billingAddress' and @name = 'dpmaudience_deal_closewon[billingDetails][billingAddress]']" },
      { type: 'CSS', value: "#dpmaudience_deal_closewon_billingDetails_billingAddress" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Billing Details/Copy From Client Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//form[@id='dealClosedWonForm']//legend[contains(.,'Billing Details')]/a[text()='Copy from client']"
    },
    selectors: [
      { type: 'XPATH', value: "//form[@id='dealClosedWonForm']//legend[contains(.,'Billing Details')]/a[text()='Copy from client']" },
      { type: 'CSS', value: "a.billing-copy.btn.btn-xs.btn-default" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Billing Details/Create New Billing Profile Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='newClientBillingProfileButton']"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//button[@id='newClientBillingProfileButton']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Billing Details/Email Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='new_client_billing_profile_billingEmail']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='new_client_billing_profile_billingEmail']" },
      { type: 'CSS', value: "#dpmaudience_deal_closewon_billingDetails_billingEmail" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Billing Details/Phone Number Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='new_client_billing_profile_billingPhoneNumber']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='new_client_billing_profile_billingPhoneNumber']" },
      { type: 'CSS', value: "#dpmaudience_deal_closewon_billingDetails_billingPhoneNumber" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Billing Details/Profile Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='new_client_billing_profile_name']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='new_client_billing_profile_name']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Billing Details/State Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='new_client_billing_profile_state']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='new_client_billing_profile_state']" },
      { type: 'CSS', value: "#dpmaudience_deal_closewon_adServer" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Billing Details/Zip Code Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='new_client_billing_profile_postalCode']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='new_client_billing_profile_postalCode']" },
      { type: 'BASIC', value: "//*[@type = 'text' and @id = 'dpmaudience_deal_closewon_billingDetails_billingAddress' and @name = 'dpmaudience_deal_closewon[billingDetails][billingAddress]']" },
      { type: 'CSS', value: "#dpmaudience_deal_closewon_billingDetails_billingAddress" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/Save Closed Won Form Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"saveClosedWon\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"saveClosedWon\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/a_Deal_Stage_Sub_Deal_Create_Order_Link': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//a[contains(text(),'Create Order') and contains(@href, \"/dpm/deals/subdeals/orders/create\")])"
    },
    selectors: [
      { type: 'XPATH', value: "(//a[contains(text(),'Create Order') and contains(@href, \"/dpm/deals/subdeals/orders/create\")])" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/button_Deal_Stage_In_Flight_Save': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[contains(@id, 'save') and @type = 'submit' and (text() = 'Save' or . = 'Save')]"
    },
    selectors: [
      { type: 'CSS', value: "#saveClosedWon" },
      { type: 'XPATH', value: "//button[contains(@id, 'save') and @type = 'submit' and (text() = 'Save' or . = 'Save')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/button_Deal_Stage_Send_To_Closed_Won': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@type = 'submit' and (text() = 'Send\n                                                        to Closed Won' or . = 'Send\n                                                        to Closed Won')]"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-default.btn-lg.btn-block" },
      { type: 'XPATH', value: "//button[@type = 'submit' and (text() = 'Send\n                                                        to Closed Won' or . = 'Send\n                                                        to Closed Won')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/button_Deal_Stage_Send_To_In_Flight': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@type = 'submit' and (text() = 'Send\n                                                        to In-flight' or . = 'Send\n                                                        to In-flight')]"
    },
    selectors: [
      { type: 'CSS', value: "div.form-group > button.btn.btn-default.btn-lg.btn-block" },
      { type: 'XPATH', value: "//button[@type = 'submit' and (text() = 'Send\n                                                        to In-flight' or . = 'Send\n                                                        to In-flight')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/button_Deal_Stage_Send_To_Proposal_Sent-Negotiation': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@type = 'submit' and (text() = 'Send\n                                                        to Proposal Sent/Negotiation' or . = 'Send\n                                                        to Proposal Sent/Negotiation')]"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-default.btn-lg.btn-block" },
      { type: 'XPATH', value: "//button[@type = 'submit' and (text() = 'Send\n                                                        to Proposal Sent/Negotiation' or . = 'Send\n                                                        to Proposal Sent/Negotiation')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/button_Deal_Stage_Send_To_Verbal_Agreement': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@type = 'submit' and (text() = 'Send\n                                                        to Verbal Agreement' or . = 'Send\n                                                        to Verbal Agreement')]"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-default.btn-lg.btn-block" },
      { type: 'XPATH', value: "//button[@type = 'submit' and (text() = 'Send\n                                                        to Verbal Agreement' or . = 'Send\n                                                        to Verbal Agreement')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/input_Deal_Stage_Potential_Monthly_Spend': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='dpmaudience_deal_closewon_potentialMonthlySpend']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_closewon_potentialMonthlySpend" },
      { type: 'XPATH', value: "//input[@id='dpmaudience_deal_closewon_potentialMonthlySpend']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/saveClosedWon_button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[normalize-space(.)=\"Send to Closed Won\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[normalize-space(.)=\"Send to Closed Won\"]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/select_Deal_Stage_Deal_Status': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='dpmaudience_deal_closewon_status']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_closewon_status" },
      { type: 'XPATH', value: "//select[@id='dpmaudience_deal_closewon_status']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/textarea_RFP Notes_dpmaudience_dealsalesNotes': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id='dpmaudience_deal_salesNotes']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_salesNotes" },
      { type: 'XPATH', value: "//textarea[@id='dpmaudience_deal_salesNotes']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/Potential Monthly Spend Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"dpmaudience_deal_closewon_potentialMonthlySpend\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@id=\"dpmaudience_deal_closewon_potentialMonthlySpend\"]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/input_CompleteDeal_CanAMTargetOutsideOfABMList': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='dpmaudience_deal_closewon_isOkToTargetOutsideAbmList']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_closewon_isOkToTargetOutsideAbmList" },
      { type: 'XPATH', value: "//input[@id='dpmaudience_deal_closewon_isOkToTargetOutsideAbmList']" },
      { type: 'BASIC', value: "//*[@type = 'checkbox' and @id = 'dpmaudience_deal_closewon_isOkToTargetOutsideAbmList' and @name = 'dpmaudience_deal_closewon[isOkToTargetOutsideAbmList]']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/input_CompleteDeal_CurateLineItemId': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//input[@id='curateLineItemId'])[${lineNumber}]"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_closewon_notes" },
      { type: 'XPATH', value: "(//input[@id='curateLineItemId'])[${lineNumber}]" },
      { type: 'BASIC', value: "//*[@id = 'dpmaudience_deal_closewon_notes' and @name = 'dpmaudience_deal_closewon[notes]']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/label_CompleteDeal_CurateLineItemId': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[@for='curateLineItemId'])[1]"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_closewon_notes" },
      { type: 'XPATH', value: "(//label[@for='curateLineItemId'])[1]" },
      { type: 'BASIC', value: "//*[@id = 'dpmaudience_deal_closewon_notes' and @name = 'dpmaudience_deal_closewon[notes]']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/select_CompleteDeal_B2BAnalyticsReportingCadence': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='dpmaudience_deal_closewon_b2bAnalyticsReportingCadence']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_closewon_b2bAnalyticsReportingCadence" },
      { type: 'XPATH', value: "//select[@id='dpmaudience_deal_closewon_b2bAnalyticsReportingCadence']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/select_CompleteDeal_DealStage': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[contains(@id, 'dpmaudience_deal_') and contains(@id, '_dealStage')]"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_spotlight_dealStage" },
      { type: 'XPATH', value: "//select[contains(@id, 'dpmaudience_deal_') and contains(@id, '_dealStage')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/select_CompleteDeal_Source': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='dpmaudience_deal_closewon_adServer']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_closewon_adServer" },
      { type: 'XPATH', value: "//select[@id='dpmaudience_deal_closewon_adServer']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/select_CompleteDeal_ViewabilityPartner': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[contains(@id, 'dpmaudience_deal_') and contains(@id, '_viewabilityPartner')]"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_closewon_viewabilityPartner" },
      { type: 'XPATH', value: "//select[contains(@id, 'dpmaudience_deal_') and contains(@id, '_viewabilityPartner')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/textarea_CompleteDeal_AccountNotes': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//iframe[@id=\"notes-field_ifr\"]"
    },
    selectors: [
      { type: 'BASIC', value: "//*[@id = 'dpmaudience_deal_closewon_notes' and @name = 'dpmaudience_deal_closewon[notes]']" },
      { type: 'CSS', value: "#dpmaudience_deal_closewon_notes" },
      { type: 'XPATH', value: "//iframe[@id=\"notes-field_ifr\"]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Contact-Details/a_ContactDetails_CopyFromClient': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//form[@id='dealClosedWonForm']//legend[contains(.,'Contact Details')]/a[text()='Copy from client']"
    },
    selectors: [
      { type: 'CSS', value: "a.billing-copy.btn.btn-xs.btn-default" },
      { type: 'XPATH', value: "//form[@id='dealClosedWonForm']//legend[contains(.,'Contact Details')]/a[text()='Copy from client']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Contact-Details/input_ContactDetails_PrimaryContactEmail': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='dpmaudience_deal_closewon_contactDetails_primaryContactEmail']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_closewon_billingDetails_billingAddress" },
      { type: 'XPATH', value: "//input[@id='dpmaudience_deal_closewon_contactDetails_primaryContactEmail']" },
      { type: 'BASIC', value: "//*[@type = 'text' and @id = 'dpmaudience_deal_closewon_billingDetails_billingAddress' and @name = 'dpmaudience_deal_closewon[billingDetails][billingAddress]']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Contact-Details/input_ContactDetails_PrimaryContactName': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='dpmaudience_deal_closewon_contactDetails_primaryContactName']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_closewon_billingDetails_billingAddress" },
      { type: 'XPATH', value: "//input[@id='dpmaudience_deal_closewon_contactDetails_primaryContactName']" },
      { type: 'BASIC', value: "//*[@type = 'text' and @id = 'dpmaudience_deal_closewon_billingDetails_billingAddress' and @name = 'dpmaudience_deal_closewon[billingDetails][billingAddress]']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Deal ID TD': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//table[contains(@class, 'spotlight-form-table')]//th[text()=\"ID\"]/following-sibling::td"
    },
    selectors: [
      { type: 'XPATH', value: "//table[contains(@class, 'spotlight-form-table')]//th[text()=\"ID\"]/following-sibling::td" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/File-Attachments/button_FileAttachments_AddNewAttachment': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@data-type=\"addNewAttachment\"]"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-xs.btn-inline.btn-primary" },
      { type: 'XPATH', value: "//button[@data-type=\"addNewAttachment\"]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/File-Attachments/button_FileAttachments_Upload': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='upload-button']"
    },
    selectors: [
      { type: 'CSS', value: "#upload-button" },
      { type: 'XPATH', value: "//button[@id='upload-button']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/File-Attachments/input_FileAttachments_NameDescription': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='upload-description']"
    },
    selectors: [
      { type: 'CSS', value: "#upload-description" },
      { type: 'XPATH', value: "//input[@id='upload-description']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/File-Attachments/input_FileAttachments_SelectFile': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@type='file' and @name='qqfile']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@type='file' and @name='qqfile']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/File-Attachments/select_FileAttachments_Category': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='category-dropdown']"
    },
    selectors: [
      { type: 'CSS', value: "#category-dropdown" },
      { type: 'XPATH', value: "//select[@id='category-dropdown']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/In-Flight/a_InFlight_SubDeal_CreateOrder': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//table[@id='subDealTable']//a[text()='Create Order'][${ALIlinkRow}]"
    },
    selectors: [
      { type: 'XPATH', value: "//table[@id='subDealTable']//a[text()='Create Order'][${ALIlinkRow}]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/In-Flight/a_InFlight_SubDeal_DescriptionRevertCell': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//table[@id='subDealTable']/tbody/tr[3]/td[9]/span/a"
    },
    selectors: [
      { type: 'XPATH', value: "//table[@id='subDealTable']/tbody/tr[3]/td[9]/span/a" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/In-Flight/button_InFlight_SendToDone': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@type='submit' and contains(text(), 'Send') and contains(text(), 'to Done')]"
    },
    selectors: [
      { type: 'CSS', value: "div.form-group > button.btn.btn-default.btn-lg.btn-block" },
      { type: 'XPATH', value: "//button[@type='submit' and contains(text(), 'Send') and contains(text(), 'to Done')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/In-Flight/button_InFlight_SendToInflight': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@type='submit' and contains(text(), 'Send') and contains(text(), 'to In-flight')]"
    },
    selectors: [
      { type: 'CSS', value: "div.form-group > button.btn.btn-default.btn-lg.btn-block" },
      { type: 'XPATH', value: "//button[@type='submit' and contains(text(), 'Send') and contains(text(), 'to In-flight')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/In-Flight/button_InFlight_UpdateSubdealsStatus': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@type='submit' and @data-provide='confirm' and contains(@class, 'btn-default') and @onclick='sendSubdealToFlight()']"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-default.btn-lg.btn-block" },
      { type: 'XPATH', value: "//button[@type='submit' and @data-provide='confirm' and contains(@class, 'btn-default') and @onclick='sendSubdealToFlight()']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/In-Flight/input_InFlight_Subdeal_Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[starts-with(@id,'updateCheckbox-')]"
    },
    selectors: [
      { type: 'CSS', value: "#updateCheckbox-10662" },
      { type: 'XPATH', value: "//input[starts-with(@id,'updateCheckbox-')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/In-Flight/textarea_InFlight_SubDeal_Description': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//table[@id='subDealTable']/tbody/tr[3]/td[9]/textarea"
    },
    selectors: [
      { type: 'CSS', value: "textarea.limit-cell.updatable-cell.form-control" },
      { type: 'XPATH', value: "//table[@id='subDealTable']/tbody/tr[3]/td[9]/textarea" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Planning-Complete/button_PlanningComplete_SaveChanges': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[contains(text(), 'Save Changes')]"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-primary.btn-lg.btn-block" },
      { type: 'XPATH', value: "//button[contains(text(), 'Save Changes')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Planning-Complete/button_PlanningComplete_SendToPlanningComplete': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[contains(text(), 'Send') and contains(text(), 'to Planning Complete')]"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-default.btn-lg.btn-block" },
      { type: 'XPATH', value: "//button[contains(text(), 'Send') and contains(text(), 'to Planning Complete')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Planning-Complete/textarea_PlanningComplete_PlanningNotes': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id='dpmaudience_deal_spotlight_blurb']"
    },
    selectors: [
      { type: 'CSS', value: "#dpmaudience_deal_spotlight_blurb" },
      { type: 'XPATH', value: "//textarea[@id='dpmaudience_deal_spotlight_blurb']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Save Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='saveClosedWon']"
    },
    selectors: [
      { type: 'CSS', value: "#saveMassupdate" },
      { type: 'XPATH', value: "//button[@id='saveClosedWon']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Send to Inflight Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"Send to In-flight\"]"
    },
    selectors: [
      { type: 'CSS', value: "div.form-group > button.btn.btn-default.btn-lg.btn-block" },
      { type: 'XPATH', value: "//button[@id=\"Send to In-flight\"]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Send-To-Planning/button_SendToPlanning_SendToPlanningReceived': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[contains(text(),'Send') and contains(text(),'to Planning Received')]"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-default.btn-lg.btn-block" },
      { type: 'XPATH', value: "//button[contains(text(),'Send') and contains(text(),'to Planning Received')]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/Subdeal Billing Source': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//table[@id=\"subDealTable\"]//tbody//tr[${index } + 1]//td[contains(@class, 'billingSource-column')]//select"
    },
    selectors: [
      { type: 'XPATH', value: "//table[@id=\"subDealTable\"]//tbody//tr[${index } + 1]//td[contains(@class, 'billingSource-column')]//select" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/button_CompleteDeal_SaveSendToOperations': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='sendToOpsClosedWon']"
    },
    selectors: [
      { type: 'CSS', value: "#sendToOpsClosedWon" },
      { type: 'XPATH', value: "//button[@id='sendToOpsClosedWon']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/div_Revert Cell': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Audience'])[1]/following::div[1]"
    },
    selectors: [
      { type: 'CSS', value: "div.form-group.row" },
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Audience'])[1]/following::div[1]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/div_Revert Cell_1': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='RFP Notes'])[1]/following::div[2]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='RFP Notes'])[1]/following::div[2]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/h4_Mass Update Impressions': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//h4[@id='massUpdateTitle']"
    },
    selectors: [
      { type: 'CSS', value: "#massUpdateTitle" },
      { type: 'XPATH', value: "//h4[@id='massUpdateTitle']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/input_Impressions_massUpdateValue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='massUpdateValue']"
    },
    selectors: [
      { type: 'CSS', value: "#massUpdateValue" },
      { type: 'XPATH', value: "//input[@id='massUpdateValue']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/input_Select All_selectAll': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='selectAll']"
    },
    selectors: [
      { type: 'CSS', value: "#selectAll" },
      { type: 'XPATH', value: "//input[@id='selectAll']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/select_Billing Source_dealdetails_spotlight_page': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='billingSourceSelect']"
    },
    selectors: [
      { type: 'CSS', value: "#billingSourceSelect" },
      { type: 'XPATH', value: "//select[@id='billingSourceSelect']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/select_KPI': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//table[@id='subDealTable']/tbody/tr[4]/td[16]/select"
    },
    selectors: [
      { type: 'XPATH', value: "//table[@id='subDealTable']/tbody/tr[4]/td[16]/select" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/select_Mass Update': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='massUpdate']"
    },
    selectors: [
      { type: 'CSS', value: "#massUpdate" },
      { type: 'XPATH', value: "//select[@id='massUpdate']" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/td_Revert Cell': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//table[@id='subDealTable']/tbody/tr[3]/td[9]"
    },
    selectors: [
      { type: 'XPATH', value: "//table[@id='subDealTable']/tbody/tr[3]/td[9]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/td_Revert Cell_1': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//table[@id='subDealTable']/tbody/tr[3]/td[10]"
    },
    selectors: [
      { type: 'XPATH', value: "//table[@id='subDealTable']/tbody/tr[3]/td[10]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/textarea_Accounts Note_1': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Account Notes'])[1]/following::textarea[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Account Notes'])[1]/following::textarea[1]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/textarea_AccountsNote_updatable-cell': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Account Notes'])[1]/following::textarea[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Account Notes'])[1]/following::textarea[1]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/textarea_Audience_Spotlightpage': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Audience'])[1]/following::textarea[1]"
    },
    selectors: [
      { type: 'CSS', value: "textarea.updatable-cell.form-control.word-break.deal-textarea" },
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Audience'])[1]/following::textarea[1]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/textarea_Audince__updatable-cell': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Audience'])[1]/following::textarea[1]"
    },
    selectors: [
      { type: 'CSS', value: "textarea.updatable-cell.form-control.word-break.deal-textarea" },
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Audience'])[1]/following::textarea[1]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/textarea_Geo_Targeting_spotlight': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Geo Targeting'])[1]/following::textarea[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Geo Targeting'])[1]/following::textarea[1]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/textarea_Planning Notes': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Planning Notes'])[1]/following::textarea[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Planning Notes'])[1]/following::textarea[1]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/textarea_Planning Notes_1': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Planning Notes'])[1]/following::textarea[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Planning Notes'])[1]/following::textarea[1]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/textarea_PlanningNotes_updatable-cell': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Planning Notes'])[1]/following::textarea[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Planning Notes'])[1]/following::textarea[1]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/textarea_RFPNotes_spotlight_page': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='RFP Notes'])[1]/following::textarea[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='RFP Notes'])[1]/following::textarea[1]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/textarea_RFPNotes_updatable-cell': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='RFP Notes'])[1]/following::textarea[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='RFP Notes'])[1]/following::textarea[1]" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/textarea_descreption_updatable-cell': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//table[@id='subDealTable']/tbody/tr[3]/td[9]/textarea"
    },
    selectors: [
      { type: 'CSS', value: "textarea.limit-cell.updatable-cell.form-control" },
      { type: 'XPATH', value: "//table[@id='subDealTable']/tbody/tr[3]/td[9]/textarea" },
    ]
  },
  'Object Repository/Backend/Sales Dashboard/Spotlight Page/textarea_geotargeting_updatable-cell': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Geo Targeting'])[1]/following::textarea[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Geo Targeting'])[1]/following::textarea[1]" },
    ]
  },
  'Object Repository/Backend/Sidebar Anchor': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//section[contains(@class, 'sidebar')]//a[text()=\"${sidebarItem}\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//section[contains(@class, 'sidebar')]//a[text()=\"${sidebarItem}\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/Account Type(Global)': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"audience-create-account-type-global\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"audience-create-account-type-global\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/Account Type(US and Canada)': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"audience-create-account-type-us-canada\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"audience-create-account-type-us-canada\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/AudienceListingPage/First Segment Name': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//h4[contains(@class, 'list-item-title')])[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(//h4[contains(@class, 'list-item-title')])[1]" },
      { type: 'CSS', value: "a.ng-star-inserted" },
    ]
  },
  'Object Repository/Frontend/Audiences/AudienceListingPage/div_Audiences_AudienceType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id=\"audience-type-dropdown\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id=\"audience-type-dropdown\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Audiences/AudienceListingPage/input_Audiences_Search': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-list-filter-search']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='audience-list-filter-search']" },
      { type: 'CSS', value: "#audience-list-filter-search" },
    ]
  },
  'Object Repository/Frontend/Audiences/AudienceListingPage/input_Audiences_SearchValues': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-list-filter-search']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='audience-list-filter-search']" },
      { type: 'CSS', value: "#audience-list-filter-search" },
    ]
  },
  'Object Repository/Frontend/Audiences/AudienceListingPage/li_Audiences_AudienceType_Item': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//ngb-popover-window[contains(@id, 'ngb-popover-')]//li[@class = 'cursor-click type-select' and contains(., '${audienceType}')]"
    },
    selectors: [
      { type: 'XPATH', value: "//ngb-popover-window[contains(@id, 'ngb-popover-')]//li[@class = 'cursor-click type-select' and contains(., '${audienceType}')]" },
      { type: 'CSS', value: "li.cursor-click.type-select" },
    ]
  },
  'Object Repository/Frontend/Audiences/AudienceListingPage/span_AudiencesSearchCount': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[contains(text(),'Showing 1 to ') and contains(text(),' result(s)')]"
    },
    selectors: [
      { type: 'XPATH', value: "//span[contains(text(),'Showing 1 to ') and contains(text(),' result(s)')]" },
      { type: 'CSS', value: "span.dark-gray-text.pager-details.mb-1" },
    ]
  },
  'Object Repository/Frontend/Audiences/AudienceListingPage/span_Audiences_Listing_Created at': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//li[@class = \"attribute align-items-center\" and contains(., 'Created at:')]//span[@class = 'attribute-value charcoal-text ng-star-inserted']"
    },
    selectors: [
      { type: 'XPATH', value: "//li[@class = \"attribute align-items-center\" and contains(., 'Created at:')]//span[@class = 'attribute-value charcoal-text ng-star-inserted']" },
      { type: 'CSS', value: "span.attribute-value.charcoal-text.ng-star-inserted" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Audiences_1stParty_MatchCriteria_ActivationType_Item': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id='audience-import-activation-type-dropdown']/following::ngb-popover-window/div[@class=\"popover-body\"]/ul[@class='popover-list mb-1']/li/span[@class='type-select'] [text()='${activationType}']"
    },
    selectors: [
      { type: 'CSS', value: "span.type-select" },
      { type: 'XPATH', value: "//span[@id='audience-import-activation-type-dropdown']/following::ngb-popover-window/div[@class=\"popover-body\"]/ul[@class='popover-list mb-1']/li/span[@class='type-select'] [text()='${activationType}']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Custom Dimension LIs': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//div[contains(@class,'header-preview-div')])[${columnNumber}]//ngb-popover-window//li[contains(@data-test-id,'custom-header')]//span"
    },
    selectors: [
      { type: 'XPATH', value: "(//div[contains(@class,'header-preview-div')])[${columnNumber}]//ngb-popover-window//li[contains(@data-test-id,'custom-header')]//span" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Custom Primary Dimension': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//div[contains(@class,'header-preview-div')])[${columnNumber}]\n  //ngb-popover-window\n  //li[contains(@data-test-id,'custom-header')]\n  //span[normalize-space(\n          translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')\n       ) = translate('${dimension}', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')]"
    },
    selectors: [
      { type: 'XPATH', value: "(//div[contains(@class,'header-preview-div')])[${columnNumber}]\n  //ngb-popover-window\n  //li[contains(@data-test-id,'custom-header')]\n  //span[normalize-space(\n          translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')\n       ) = translate('${dimension}', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Customer Match/Customer Match Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='audience-create-email-type-customer-match']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='audience-create-email-type-customer-match']" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Customer Match/File Type Radio': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"audience-import-customer-match-hashed-type\"]"
    },
    selectors: [
      { type: 'CSS', value: "" },
      { type: 'XPATH', value: "//input[@id=\"audience-import-customer-match-hashed-type\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Customer Match/Hashed File Radio Option': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"audience-import-customer-match-hashed-type\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"audience-import-customer-match-hashed-type\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Customer Match/Liveramp Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"audience-create-email-type-liveramp\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//button[@id=\"audience-create-email-type-liveramp\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Customer Match/Plain Text Radio Option': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"audience-import-customer-match-text-type\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"audience-import-customer-match-text-type\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Error Alert': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-audience-import//div[contains(@class, 'alert-danger')]"
    },
    selectors: [
      { type: 'XPATH', value: "//app-audience-import//div[contains(@class, 'alert-danger')]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Primary Dimension Spans': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[contains(@class, 'header-span')]"
    },
    selectors: [
      { type: 'XPATH', value: "//span[contains(@class, 'header-span')]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Refinement Dimension': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//div[contains(@class,'header-preview-div')])[${columnNumber}]\n  //ngb-popover-window//li[contains(@data-test-id, 'refinement-dimension')]\n  //span[normalize-space()='${dimension}']"
    },
    selectors: [
      { type: 'XPATH', value: "(//div[contains(@class,'header-preview-div')])[${columnNumber}]\n  //ngb-popover-window//li[contains(@data-test-id, 'refinement-dimension')]\n  //span[normalize-space()='${dimension}']" },
      { type: 'CSS', value: "span.ad-icon-down.ad-icon.float-right.mr-1" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/a_Match Criteria': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='audience-create-build-rules-nav-link']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-build-rules-nav-link" },
      { type: 'XPATH', value: "//a[@id='audience-create-build-rules-nav-link']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/div_Audiences_1stParty_MatchCriteria_AddFile_Message': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[(contains(text(), 'has been uploaded.') or contains(., 'has been uploaded.'))]"
    },
    selectors: [
      { type: 'BASIC', value: "//*[(text() = ' File sample_Many Columns.csv has been uploaded. ' or . = ' File sample_Many Columns.csv has been uploaded. ')]" },
      { type: 'XPATH', value: "//div[(contains(text(), 'has been uploaded.') or contains(., 'has been uploaded.'))]" },
      { type: 'CSS', value: "div.file-upload-feedback.ng-tns-c176-1.ng-star-inserted" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/h3_Audiences_1stParty_MatchCriteria_BusinessRecordsFound': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Agriculture, Forestry, Fishing and Hunting'])[1]/following::h3[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Agriculture, Forestry, Fishing and Hunting'])[1]/following::h3[1]" },
      { type: 'CSS', value: "h3.text-center" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/input_Audiences_1stParty_MatchCriteria_AddFile': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-import-file' and @type='file']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-import-file" },
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@id='audience-import-file' and @type='file']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/input_Audiences_1stParty_MatchCriteria_Advertiser': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='basic-setup-advertiser']"
    },
    selectors: [
      { type: 'CSS', value: "#basic-setup-advertiser" },
      { type: 'BASIC', value: "//*[@id = 'basic-setup-advertiser' and @type = 'text' and @placeholder = 'Advertiser']" },
      { type: 'XPATH', value: "//input[@id='basic-setup-advertiser']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/input_FileContainsaHeaderRow': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-import-include-first-row']"
    },
    selectors: [
      { type: 'BASIC', value: "//*[(text() = 'File Contains a Header Row' or . = 'File Contains a Header Row')]" },
      { type: 'XPATH', value: "//input[@id='audience-import-include-first-row']" },
      { type: 'CSS', value: "span.float-right.ad-custom-checkmark.ml-auto.pr-5.ng-tns-c176-2 > label.ng-tns-c176-2" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/label_Audiences_1stParty_MatchCriteria_FilterCriteriaStatus': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[@for='audience-import-rule-overlay']/span"
    },
    selectors: [
      { type: 'CSS', value: "label.custom-control-label.ng-tns-c176-1" },
      { type: 'XPATH', value: "//label[@for='audience-import-rule-overlay']/span" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/span_Audiences_1stParty_MatchCriteria_ActivationType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id='audience-import-activation-type-dropdown' and contains(text(), '${activationType}')]"
    },
    selectors: [
      { type: 'CSS', value: "span.ad-icon-down.ad-icon.float-right.mr-1" },
      { type: 'XPATH', value: "//span[@id='audience-import-activation-type-dropdown' and contains(text(), '${activationType}')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/span_Audiences_1stParty_MatchCriteria_Advertiser_Item': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Advertiser'])[1]/following::span[(text() = '${advertiser}' or . = '${advertiser}')]"
    },
    selectors: [
      { type: 'CSS', value: "span.d-flex.flex-row.justify-content-center.align-items-center.py-2.ng-star-inserted" },
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Advertiser'])[1]/following::span[(text() = '${advertiser}' or . = '${advertiser}')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/span_Audiences_1stParty_MatchCriteria_FileName': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[@for='audience-import-file']/span"
    },
    selectors: [
      { type: 'CSS', value: "#audience-import-file" },
      { type: 'XPATH', value: "//label[@for='audience-import-file']/span" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/span_Audiences_1stParty_MatchCriteria_FilterCriteria': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='audience-groups-select-active-group' and contains(.,'${groupName}') and contains(.,'${filterCriteria}')]"
    },
    selectors: [
      { type: 'CSS', value: "#audience-groups-remove-not-1st-party-rule" },
      { type: 'XPATH', value: "//div[@id='audience-groups-select-active-group' and contains(.,'${groupName}') and contains(.,'${filterCriteria}')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/span_Audiences_1stParty_MatchCriteria_FilterCriteria_Remove': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='audience-groups-select-active-group' and contains(.,'${groupName}') and contains(.,'${filterCriteria}')]//span[contains(@id, 'audience-groups-remove')]"
    },
    selectors: [
      { type: 'CSS', value: "#audience-groups-remove-not-1st-party-rule" },
      { type: 'XPATH', value: "//div[@id='audience-groups-select-active-group' and contains(.,'${groupName}') and contains(.,'${filterCriteria}')]//span[contains(@id, 'audience-groups-remove')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/span_Audiences_1stParty_MatchCriteria_FilterCriteria_RemoveGroup': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='audience-groups-select-active-group' and contains(.,'${groupName}')]//span[contains(@id, 'audience-groups-remove-group')]"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='audience-groups-select-active-group' and contains(.,'${groupName}')]//span[contains(@id, 'audience-groups-remove-group')]" },
      { type: 'CSS', value: "#audience-groups-remove-group" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/span_Audiences_1stParty_MatchCriteria_PrimaryDimension': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//span[contains(@class, 'header-span') and contains(@class, 'cursor-click')])[${columnNumber}]"
    },
    selectors: [
      { type: 'CSS', value: "span.ad-icon-down.ad-icon.float-right.mr-1" },
      { type: 'XPATH', value: "(//span[contains(@class, 'header-span') and contains(@class, 'cursor-click')])[${columnNumber}]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/span_Audiences_1stParty_MatchCriteria_PrimaryDimension_Item': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//div[contains(@class,'header-preview-div')])[${columnNumber}]//ngb-popover-window//li//span[text()='${dimension}'][not(../span[contains(@class, 'add-icon')])]"
    },
    selectors: [
      { type: 'CSS', value: "span.ad-icon-down.ad-icon.float-right.mr-1" },
      { type: 'XPATH', value: "(//div[contains(@class,'header-preview-div')])[${columnNumber}]//ngb-popover-window//li//span[text()='${dimension}'][not(../span[contains(@class, 'add-icon')])]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/span_Audiences_MatchCriteria_FilterCriteriaCardName': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='audience-groups-select-active-group' and contains(. , '${groupName}')]//span[(text() = '${filterCriteria}') or (. = '${filterCriteria}')]"
    },
    selectors: [
      { type: 'CSS', value: "span.badge.badge-pill.small-text.pointer.p-2.m-2.ng-star-inserted" },
      { type: 'XPATH', value: "//div[@id='audience-groups-select-active-group' and contains(. , '${groupName}')]//span[(text() = '${filterCriteria}') or (. = '${filterCriteria}')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/span_Audiences_MatchCriteria_FilterCriteria_GroupNameCardNumber': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//div[@id='audience-groups-select-active-group' and contains(. , '${groupName}')]//span[contains(@class, \"group-items\")])[${cardNumber}]"
    },
    selectors: [
      { type: 'CSS', value: "span.badge.badge-pill.small-text.pointer.p-2.m-2.ng-star-inserted" },
      { type: 'XPATH', value: "(//div[@id='audience-groups-select-active-group' and contains(. , '${groupName}')]//span[contains(@class, \"group-items\")])[${cardNumber}]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/strong_Audiences_MatchCriteria_AlertMessage': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-audience-import//div[contains(@class,'alert')]//div"
    },
    selectors: [
      { type: 'CSS', value: "strong.ng-tns-c129-1" },
      { type: 'XPATH', value: "//app-audience-import//div[contains(@class,'alert')]//div" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/h2_1st Party Data': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Back to Audience Listing'])[1]/following::h2[1]"
    },
    selectors: [
      { type: 'CSS', value: "h2.mb-3" },
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Back to Audience Listing'])[1]/following::h2[1]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience3rdPartyData/h2_Audiences_3rdPartyData': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//h2[text()=\"3rd Party Data\"]"
    },
    selectors: [
      { type: 'CSS', value: "div.flex-row.flex-grow-1.justify-content-between > div.card-body.flex-column.card-activation-type" },
      { type: 'XPATH', value: "//h2[text()=\"3rd Party Data\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/a_Audiences_BusinessData_MatchCriteria_CriteriaTypeSelection': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[contains(@id, 'audience-ip-select-rules-add') and(text()='${criteriaValue}' or .='${criteriaValue}')]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[contains(@id, 'audience-ip-select-rules-add') and(text()='${criteriaValue}' or .='${criteriaValue}')]" },
      { type: 'CSS', value: "#audience-ip-select-rules-add-0" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/a_MatchCriteria': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='audience-create-build-rules-nav-link']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-build-rules-nav-link" },
      { type: 'XPATH', value: "//a[@id='audience-create-build-rules-nav-link']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/button_Audiences_BusinessData_MatchCriteria_CriteriaSearchResult': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//button[contains(@id, 'ngb-typeahead') and (text()='${criteriaValue}' or .='${criteriaValue}')])[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(//button[contains(@id, 'ngb-typeahead') and (text()='${criteriaValue}' or .='${criteriaValue}')])[1]" },
      { type: 'CSS', value: "#ngb-typeahead-0-0" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/button_Audiences_BusinessData_MatchCriteria_RevenueRangeAdd': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='audience-ip-revenue-range-add']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='audience-ip-revenue-range-add']" },
      { type: 'CSS', value: "#audience-ip-revenue-range-add" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/button_DuplicateRuleSearchSegmentResult': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='ngb-typeahead-2-0']"
    },
    selectors: [
      { type: 'CSS', value: "#ngb-typeahead-2-0" },
      { type: 'XPATH', value: "//button[@id='ngb-typeahead-2-0']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/input_Audiences_BusinessData_MatchCriteria_BulkImportToggle': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@type='checkbox' and @id='audience-groups-bulk-import-active']//following-sibling::label"
    },
    selectors: [
      { type: 'CSS', value: "div.custom-switch-container.text-right.p-3" },
      { type: 'XPATH', value: "//input[@type='checkbox' and @id='audience-groups-bulk-import-active']//following-sibling::label" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/input_Audiences_BusinessData_MatchCriteria_BulkUploadFile': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id = 'audience-import-file' and @type = 'file']"
    },
    selectors: [
      { type: 'CSS', value: "form.ng-untouched.ng-pristine.ng-invalid" },
      { type: 'XPATH', value: "//input[@id = 'audience-import-file' and @type = 'file']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/input_Audiences_BusinessData_MatchCriteria_CriteriaSearch': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-autocomplete-input']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='audience-autocomplete-input']" },
      { type: 'CSS', value: "#audience-autocomplete-input" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/input_Audiences_BusinessData_MatchCriteria_NAICSSearch': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-list-business-data-search']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='audience-list-business-data-search']" },
      { type: 'CSS', value: "#audience-list-business-data-search" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/input_Audiences_BusinessData_MatchCriteria_RevenueRangeFrom': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-ip-revenue-range-from']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='audience-ip-revenue-range-from']" },
      { type: 'CSS', value: "#audience-ip-revenue-range-from" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/input_Audiences_BusinessData_MatchCriteria_RevenueRangeTo': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-ip-revenue-range-to']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='audience-ip-revenue-range-to']" },
      { type: 'CSS', value: "#audience-ip-revenue-range-to" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/input_Audiences_BusinessData_MatchCriteria_Target': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-groups-target-all']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='audience-groups-target-all']" },
      { type: 'CSS', value: "#audience-ip-revenue-range-to" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/input_Type_DuplicateRulesSearchSegment': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-autocomplete-input']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-autocomplete-input" },
      { type: 'XPATH', value: "//input[@id='audience-autocomplete-input']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/label_Audiences_BusinessData_MatchCriteria_Target': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[@for='audience-groups-target-all']/span"
    },
    selectors: [
      { type: 'CSS', value: "span.ng-star-inserted > label.custom-control-label" },
      { type: 'XPATH', value: "//label[@for='audience-groups-target-all']/span" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/select_Audiences_BusinessData_MatchCriteria_BulkUploadType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id = 'audience-bulk-import-type']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-bulk-import-type" },
      { type: 'XPATH', value: "//select[@id = 'audience-bulk-import-type']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/select_Audiences_BusinessData_MatchCriteria_Type': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='audience-ip-rules-type']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='audience-ip-rules-type']" },
      { type: 'CSS', value: "#audience-ip-rules-type" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/span_Audiences_BusinessData_MatchCriteriaAdvanceSettings': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[contains(@id,'audience-ip-advanced-report-settings-toggle')]//span[text()='${advancedSettings}' or .='${advancedSettings}']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-ip-advanced-report-settings-toggle-exclude-no-naics" },
      { type: 'XPATH', value: "//div[contains(@id,'audience-ip-advanced-report-settings-toggle')]//span[text()='${advancedSettings}' or .='${advancedSettings}']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/span_Audiences_BusinessData_MatchCriteria_BulkImportToggle': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[@for = 'audience-groups-bulk-import-active']/span[text() = 'Inactive' or text() = 'Active']"
    },
    selectors: [
      { type: 'CSS', value: "label.custom-control-label > span" },
      { type: 'XPATH', value: "//label[@for = 'audience-groups-bulk-import-active']/span[text() = 'Inactive' or text() = 'Active']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/span_Audiences_BusinessData_MatchCriteria_County': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='audience-ip-county-select-county' and(text()='${countyName}' or .='${countyName}')]//span[@class='fantom-checkbox']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='audience-ip-county-select-county' and(text()='${countyName}' or .='${countyName}')]//span[@class='fantom-checkbox']" },
      { type: 'CSS', value: "#audience-ip-county-select-county > span" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/span_Audiences_BusinessData_MatchCriteria_CountyState': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='audience-ip-county-toggle-state']//span[text()='${countyState}' or .='${countyState}']"
    },
    selectors: [
      { type: 'CSS', value: "span[title=\"Alabama\"]" },
      { type: 'XPATH', value: "//div[@id='audience-ip-county-toggle-state']//span[text()='${countyState}' or .='${countyState}']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/span_Audiences_BusinessData_MatchCriteria_NAICSSearchResult': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[contains(@id, 'audience-ip-naics-select') and (text()='${naics}' or .='${naics}')]"
    },
    selectors: [
      { type: 'XPATH', value: "//span[contains(@id, 'audience-ip-naics-select') and (text()='${naics}' or .='${naics}')]" },
      { type: 'CSS', value: "#audience-ip-naics-select-0" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/h2_Business Data': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//h2[contains(text(), 'Business Data')]"
    },
    selectors: [
      { type: 'XPATH', value: "//h2[contains(text(), 'Business Data')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceConsumerData/h2_Audiences_ConsumerData': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//h2[text()=\"Consumer Data\"]"
    },
    selectors: [
      { type: 'CSS', value: "div.flex-grow-1.flex-column.mb-4.ng-star-inserted > div.card-body.flex-column.card-activation-type" },
      { type: 'XPATH', value: "//h2[text()=\"Consumer Data\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/a_MatchCriteria': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='audience-create-build-rules-nav-link']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-build-rules-nav-link" },
      { type: 'XPATH', value: "//a[@id='audience-create-build-rules-nav-link']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/button_Audiences_OnsiteIntent_MatchCriteria_AddGroup': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='audience-groups-add-group']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='audience-groups-add-group']" },
      { type: 'CSS', value: "div.mt-2.text-right" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/button_Audiences_OnsiteIntent_MatchCriteria_AddRule': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[text() = 'Add Rule' or . = 'Add Rule']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[text() = 'Add Rule' or . = 'Add Rule']" },
      { type: 'CSS', value: "#audience-first-party-multiple-select-add" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/div_Audiences_OnsiteIntent_MatchCriteria_GroupCard': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='audience-groups-select-active-group']//span[text()='${groupName}' or .='${groupName}']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='audience-groups-select-active-group']//span[text()='${groupName}' or .='${groupName}']" },
      { type: 'CSS', value: "#audience-groups-select-active-group" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/input_Audiences_OnsiteIntent_MatchCriteria_Value': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-first-party-comparator-value']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-first-party-comparator-value" },
      { type: 'XPATH', value: "//input[@id='audience-first-party-comparator-value']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/label_Audiences_OnsiteIntent_MatchCriteria_TargetType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[contains(@for,'audience-groups-target')]"
    },
    selectors: [
      { type: 'XPATH', value: "//label[contains(@for,'audience-groups-target')]" },
      { type: 'CSS', value: "label.custom-control-label > span" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/select_Audiences_OnsiteIntent_MatchCriteria_MatchType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='audience-first-party-comparator-match-type']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-first-party-comparator-match-type" },
      { type: 'XPATH', value: "//select[@id='audience-first-party-comparator-match-type']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/select_Audiences_OnsiteIntent_MatchCriteria_MatchTypeHref': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='audience-first-party-clicks-ad-match-type-href']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='audience-first-party-clicks-ad-match-type-href']" },
      { type: 'CSS', value: "#audience-first-party-clicks-ad-match-type-href" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/select_Audiences_OnsiteIntent_MatchCriteria_MatchTypeMultiSelect': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='audience-first-party-multiple-select-match-type']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-first-party-multiple-select-match-type" },
      { type: 'XPATH', value: "//select[@id='audience-first-party-multiple-select-match-type']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/select_Audiences_OnsiteIntent_MatchCriteria_MatchTypeURL': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='audience-first-party-clicks-ad-match-type-url']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='audience-first-party-clicks-ad-match-type-url']" },
      { type: 'CSS', value: "#audience-first-party-clicks-ad-match-type-url" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/select_Audiences_OnsiteIntent_MatchCriteria_SearchParameter': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='audience-first-party-page-content-search-param']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-first-party-page-content-search-param" },
      { type: 'XPATH', value: "//select[@id='audience-first-party-page-content-search-param']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/select_Audiences_OnsiteIntent_MatchCriteria_Type': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='audience-first-party-type']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-first-party-type" },
      { type: 'XPATH', value: "//select[@id='audience-first-party-type']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/select_Audiences_OnsiteIntent_MatchCriteria_ValueMultiSelect': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='audience-first-party-multiple-select-value']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-first-party-multiple-select-value" },
      { type: 'XPATH', value: "//select[@id='audience-first-party-multiple-select-value']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/span_Audiences_OnsiteIntent_MatchCriteria_TargetType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[contains(@for,'audience-groups-target')]/span[text()='Target ${targetType}' or .='Target ${targetType}']"
    },
    selectors: [
      { type: 'XPATH', value: "//label[contains(@for,'audience-groups-target')]/span[text()='Target ${targetType}' or .='Target ${targetType}']" },
      { type: 'CSS', value: "label.custom-control-label > span" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/textarea_Audiences_OnsiteIntent_MatchCriteria_EvaluateJavaScript': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id='audience-first-party-javascript-eval-javascript']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-first-party-javascript-eval-javascript" },
      { type: 'XPATH', value: "//textarea[@id='audience-first-party-javascript-eval-javascript']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/textarea_Audiences_OnsiteIntent_MatchCriteria_JquerySelector': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id='audience-first-party-page-content-jquery']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-first-party-page-content-jquery" },
      { type: 'XPATH', value: "//textarea[@id='audience-first-party-page-content-jquery']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/textarea_Audiences_OnsiteIntent_MatchCriteria_SearchHrefFor': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id='audience-first-party-clicks-ad-href']"
    },
    selectors: [
      { type: 'XPATH', value: "//textarea[@id='audience-first-party-clicks-ad-href']" },
      { type: 'CSS', value: "#audience-first-party-clicks-ad-href" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/textarea_Audiences_OnsiteIntent_MatchCriteria_SearchParameter': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id='audience-first-party-page-content-search']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-first-party-page-content-search" },
      { type: 'XPATH', value: "//textarea[@id='audience-first-party-page-content-search']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/textarea_Audiences_OnsiteIntent_MatchCriteria_SearchURLFor': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id='audience-first-party-clicks-ad-url']"
    },
    selectors: [
      { type: 'XPATH', value: "//textarea[@id='audience-first-party-clicks-ad-url']" },
      { type: 'CSS', value: "#audience-first-party-clicks-ad-url" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/h2_Audiences_OnsiteIntent': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//h2[text() = 'On-site Intent' or . = 'On-site Intent']"
    },
    selectors: [
      { type: 'CSS', value: "div.card-body.flex-column.card-activation-type > div.d-flex.flex-row" },
      { type: 'XPATH', value: "//h2[text() = 'On-site Intent' or . = 'On-site Intent']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/AudienceComposition/a_Audiences_AudienceComposition': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='audience-create-preview-nav-link']"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//a[@id='audience-create-preview-nav-link']" },
      { type: 'CSS', value: "#audience-create-preview-nav-link" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/AudienceComposition/div_Audiences_AudienceComposition_PreviewSelectionToggle': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='es-preview-collapse-toggle']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='es-preview-collapse-toggle']" },
      { type: 'CSS', value: "#es-preview-collapse-toggle" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/AudienceComposition/h2_Audiences_AudienceComposition_AudiencesSelection': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//h2[(text() = '${sectionName}' or . = '${sectionName}')]|//h5[(text() = '${sectionName}' or . = '${sectionName}')]"
    },
    selectors: [
      { type: 'XPATH', value: "//h2[(text() = '${sectionName}' or . = '${sectionName}')]|//h5[(text() = '${sectionName}' or . = '${sectionName}')]" },
      { type: 'CSS', value: "div.d-flex.flex-row.position-relative > h2" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/AudienceComposition/input_Audiences_AudienceComposition_PreviewSelection': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[contains(text(), '${previewSelection}') or contains(., '${previewSelection}')]/input[@type='checkbox' and contains(@id,'es-preview-')]"
    },
    selectors: [
      { type: 'XPATH', value: "//div[contains(text(), '${previewSelection}') or contains(., '${previewSelection}')]/input[@type='checkbox' and contains(@id,'es-preview-')]" },
      { type: 'CSS', value: "div.ad-custom-checkmark.form-check-inline > label" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/AudienceComposition/span_Audiences_AudienceComposition_CompanyCount': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//p[contains(text(), 'Company Count') or contains(., 'Company Count')]/span"
    },
    selectors: [
      { type: 'XPATH', value: "//p[contains(text(), 'Company Count') or contains(., 'Company Count')]/span" },
      { type: 'CSS', value: "p.text-center.text-size-big" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/AudienceComposition/span_Audiences_AudienceComposition_PreviewSelectionClose': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id='es-preview-collapse-settings']"
    },
    selectors: [
      { type: 'XPATH', value: "//span[@id='es-preview-collapse-settings']" },
      { type: 'CSS', value: "#es-preview-collapse-settings" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/a_Exclusion Criteria': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='audience-create-exclusion-nav-link']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-exclusion-nav-link" },
      { type: 'XPATH', value: "//a[@id='audience-create-exclusion-nav-link']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/button_Audiences_1stParty_ExclusionCriteria_DunsNumberAccordian': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-test-id=\"audience-create-duns-number-exclusion-accordion\"]"
    },
    selectors: [
      { type: 'CSS', value: "span.ad-icon-add.ad-icon-primary-s2.ng-star-inserted" },
      { type: 'XPATH', value: "//div[@data-test-id=\"audience-create-duns-number-exclusion-accordion\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/button_Audiences_1stParty_ExclusionCriteria_EmployeeCountAccordian': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-test-id=\"audience-create-number-of-employees-accordion\"]"
    },
    selectors: [
      { type: 'CSS', value: "#audience-blacklist-number-of-employees-accordion > div.accordion-header__btn > span.ad-icon-add.ad-icon-primary-s2.ng-star-inserted" },
      { type: 'XPATH', value: "//div[@data-test-id=\"audience-create-number-of-employees-accordion\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/button_Audiences_1stParty_ExclusionCriteria_GeoTargetingAccordian': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-test-id=\"audience-create-geo-targeting-exclusion-accordion\"]"
    },
    selectors: [
      { type: 'CSS', value: "#geo-targeting-header > button.accordion-header.collapsed.ng-star-inserted > div.accordion-header__btn > span.ad-icon-add.ad-icon-primary-s2.ng-star-inserted" },
      { type: 'XPATH', value: "//div[@data-test-id=\"audience-create-geo-targeting-exclusion-accordion\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/button_Audiences_1stParty_ExclusionCriteria_NACISCodeAccordian': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-test-id=\"audience-create-naics-code-exclusion-accordion\"]"
    },
    selectors: [
      { type: 'CSS', value: "#audience-blacklist-naics-code-accordion > div.accordion-header__btn > span.ad-icon-add.ad-icon-primary-s2.ng-star-inserted" },
      { type: 'XPATH', value: "//div[@data-test-id=\"audience-create-naics-code-exclusion-accordion\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/button_Audiences_1stParty_ExclusionCriteria_SalesVolumeAccordian': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-test-id=\"audience-create-sales-volume-exclusion-accordion\"]"
    },
    selectors: [
      { type: 'CSS', value: "#audience-blacklist-sales-volume-accordion > div.accordion-header__btn > span.ad-icon-add.ad-icon-primary-s2.ng-star-inserted" },
      { type: 'XPATH', value: "//div[@data-test-id=\"audience-create-sales-volume-exclusion-accordion\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/button_Audiences_1stParty_ExclusionCriteria_YearsInBusinessAccordian': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-test-id=\"audience-create-years-in-business-exclusion-accordion\"]"
    },
    selectors: [
      { type: 'CSS', value: "#audience-blacklist-years-in-business-accordion > div.accordion-header__btn > span.ad-icon-add.ad-icon-primary-s2.ng-star-inserted" },
      { type: 'XPATH', value: "//div[@data-test-id=\"audience-create-years-in-business-exclusion-accordion\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/input_Audiences_1stParty_ExclusionCriteria_County': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@class='d-flex flex-row county' and (contains(.,'${countyName}') or contains(text(), '${countyName}'))]/div/input[contains(@id,'county-checkbox')]"
    },
    selectors: [
      { type: 'CSS', value: "span.fantom-checkbox" },
      { type: 'XPATH', value: "//div[@class='d-flex flex-row county' and (contains(.,'${countyName}') or contains(text(), '${countyName}'))]/div/input[contains(@id,'county-checkbox')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/input_Audiences_1stParty_ExclusionCriteria_EmployeeCount_Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@type = 'checkbox' and contains(@id, 'audience-blacklist-employees${elementIndex}')]"
    },
    selectors: [
      { type: 'CSS', value: "span.ad-custom-checkmark.form-check-nonsale > label" },
      { type: 'XPATH', value: "//input[@type = 'checkbox' and contains(@id, 'audience-blacklist-employees${elementIndex}')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/input_Audiences_1stParty_ExclusionCriteria_EmployeeCount_Checkboxes': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@type = 'checkbox' and contains(@id, 'audience-blacklist-employees')]"
    },
    selectors: [
      { type: 'CSS', value: "span.ad-custom-checkmark.form-check-nonsale > label" },
      { type: 'XPATH', value: "//input[@type = 'checkbox' and contains(@id, 'audience-blacklist-employees')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/input_Audiences_1stParty_ExclusionCriteria_SalesVolume_Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@type = 'checkbox' and contains(@id, 'audience-blacklist-salesVolume${elementIndex}')]"
    },
    selectors: [
      { type: 'CSS', value: "span.ad-custom-checkmark.mt-2 > label" },
      { type: 'XPATH', value: "//input[@type = 'checkbox' and contains(@id, 'audience-blacklist-salesVolume${elementIndex}')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/input_Audiences_1stParty_ExclusionCriteria_SalesVolume_Checkboxes': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@type = 'checkbox' and contains(@id, 'audience-blacklist-salesVolume')]"
    },
    selectors: [
      { type: 'CSS', value: "span.ad-custom-checkmark.mt-2 > label" },
      { type: 'XPATH', value: "//input[@type = 'checkbox' and contains(@id, 'audience-blacklist-salesVolume')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/input_Audiences_1stParty_ExclusionCriteria_Search': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-autocomplete-input']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-autocomplete-input" },
      { type: 'XPATH', value: "//input[@id='audience-autocomplete-input']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/input_Audiences_1stParty_ExclusionCriteria_YearsInBusiness_Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@type = 'checkbox' and contains(@id, 'audience-blacklist-years${elementIndex}')]"
    },
    selectors: [
      { type: 'CSS', value: "#years > div.card-body > div.sand-40.ng-star-inserted > div.p-4 > div.d-flex.flex-row.flex-wrap > div.blacklist-checkbox.mt-2.ng-star-inserted > span.ad-custom-checkmark.form-check-nonsale > label" },
      { type: 'XPATH', value: "//input[@type = 'checkbox' and contains(@id, 'audience-blacklist-years${elementIndex}')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/input_Audiences_1stParty_ExclusionCriteria_YearsInBusiness_Checkboxes': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@type = 'checkbox' and contains(@id, 'audience-blacklist-years')]"
    },
    selectors: [
      { type: 'CSS', value: "#years > div.card-body > div.sand-40.ng-star-inserted > div.p-4 > div.d-flex.flex-row.flex-wrap > div.blacklist-checkbox.mt-2.ng-star-inserted > span.ad-custom-checkmark.form-check-nonsale > label" },
      { type: 'XPATH', value: "//input[@type = 'checkbox' and contains(@id, 'audience-blacklist-years')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/input_Audiences_1stParty_ExclusionCriteria_ZipCode': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='order']"
    },
    selectors: [
      { type: 'CSS', value: "#order" },
      { type: 'XPATH', value: "//input[@id='order']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/select_Audiences_1stParty_ExclusionCriteria_CountyState': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='state']"
    },
    selectors: [
      { type: 'CSS', value: "#state" },
      { type: 'XPATH', value: "//select[@id='state']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/select_Audiences_1stParty_ExclusionCriteria_GeoTargetingType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='type']"
    },
    selectors: [
      { type: 'CSS', value: "#type" },
      { type: 'XPATH', value: "//select[@id='type']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/span_Audiences_1stParty_ExclusionCriteria_County': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@class='flex-item position-relative ng-star-inserted' and (contains(.,'${countyName}') or contains(text(), '${countyName}'))]/span[@class='fantom-checkbox']"
    },
    selectors: [
      { type: 'CSS', value: "span.fantom-checkbox" },
      { type: 'XPATH', value: "//div[@class='flex-item position-relative ng-star-inserted' and (contains(.,'${countyName}') or contains(text(), '${countyName}'))]/span[@class='fantom-checkbox']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/span_Audiences_1stParty_ExclusionCriteria_searchResult': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[contains(@id, 'ngb-typeahead-')]//span[text()='${searchResult}']"
    },
    selectors: [
      { type: 'CSS', value: "#ngb-typeahead-1-0" },
      { type: 'XPATH', value: "//button[contains(@id, 'ngb-typeahead-')]//span[text()='${searchResult}']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/span_Audiences_ExclusionCriteria_GeoTargeting_City_Remove': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='geo-targeting']//div[@class='sand mt-3 ng-star-inserted' and contains(.,'City')]//following::span[(text() = '${city}' or . = '${city}')]//span[@class='ad-icon-x ad-icon-primary-s1 ad-icon-small']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='geo-targeting']//div[@class='sand mt-3 ng-star-inserted' and contains(.,'City')]//following::span[(text() = '${city}' or . = '${city}')]//span[@class='ad-icon-x ad-icon-primary-s1 ad-icon-small']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/span_Audiences_ExclusionCriteria_GeoTargeting_County_Remove': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='geo-targeting']//div[@class='sand mt-3 ng-star-inserted' and contains(.,'County')]//following::span[(text() = '${county}' or . = '${county}')]//span[@class='ad-icon-x ad-icon-primary-s1 ad-icon-small']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='geo-targeting']//div[@class='sand mt-3 ng-star-inserted' and contains(.,'County')]//following::span[(text() = '${county}' or . = '${county}')]//span[@class='ad-icon-x ad-icon-primary-s1 ad-icon-small']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/span_Audiences_ExclusionCriteria_GeoTargeting_Province_Remove': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='geo-targeting']//div[@class='sand mt-3 ng-star-inserted' and contains(.,'Province')]//following::span[(text() = '${province}' or . = '${province}')]//span[@class='ad-icon-x ad-icon-primary-s1 ad-icon-small']"
    },
    selectors: [
      { type: 'CSS', value: "span.badge.badge-pill.small-text.pointer.p-2.m-2.ng-star-inserted" },
      { type: 'XPATH', value: "//div[@id='geo-targeting']//div[@class='sand mt-3 ng-star-inserted' and contains(.,'Province')]//following::span[(text() = '${province}' or . = '${province}')]//span[@class='ad-icon-x ad-icon-primary-s1 ad-icon-small']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/span_Audiences_ExclusionCriteria_GeoTargeting_Selection_Index': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//div[@id='geo-targeting']//div[@class='sand mt-3 ng-star-inserted' and contains(.,'${groupName}')]//span[@class='badge-label mx-1'])[${cardIndex}]"
    },
    selectors: [
      { type: 'XPATH', value: "(//div[@id='geo-targeting']//div[@class='sand mt-3 ng-star-inserted' and contains(.,'${groupName}')]//span[@class='badge-label mx-1'])[${cardIndex}]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/span_Audiences_ExclusionCriteria_GeoTargeting_Selection_Text': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id = 'geo-targeting']//div[@class = 'sand mt-3 ng-star-inserted' and contains(., '${groupName}')]//span[(text() = '${cardText}' or . = '${cardText}')]"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id = 'geo-targeting']//div[@class = 'sand mt-3 ng-star-inserted' and contains(., '${groupName}')]//span[(text() = '${cardText}' or . = '${cardText}')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/span_Audiences_ExclusionCriteria_GeoTargeting_State_Remove': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='geo-targeting']//div[@class='sand mt-3 ng-star-inserted' and contains(.,'State')]//following::span[(text() = '${state}' or . = '${state}')]//span[@class='ad-icon-x ad-icon-primary-s1 ad-icon-small']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='geo-targeting']//div[@class='sand mt-3 ng-star-inserted' and contains(.,'State')]//following::span[(text() = '${state}' or . = '${state}')]//span[@class='ad-icon-x ad-icon-primary-s1 ad-icon-small']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/span_EditAudience_ExclusionCriteria_GeoTargeting_RemoveSelection': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='geo-targeting']//div[@class='sand mt-3 ng-star-inserted' and contains(.,'${section}')]//following::span[(text() = '${tagName}' or . = '${tagName}')]//span[@class='ad-icon-x ad-icon-primary-s1 ad-icon-small']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='geo-targeting']//div[@class='sand mt-3 ng-star-inserted' and contains(.,'${section}')]//following::span[(text() = '${tagName}' or . = '${tagName}')]//span[@class='ad-icon-x ad-icon-primary-s1 ad-icon-small']" },
      { type: 'CSS', value: "span.ad-icon-x.ad-icon-primary-s1.ad-icon-small" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/textarea_Audiences_1stParty_ExclusionCriteria_DunsNumberExclusion': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id='audience-blacklist-dunsBlacklist']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-blacklist-dunsBlacklist" },
      { type: 'XPATH', value: "//textarea[@id='audience-blacklist-dunsBlacklist']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/textarea_Audiences_1stParty_ExclusionCriteria_NAICSCode': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id='audience-blacklist-naicsCodes']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-blacklist-naicsCodes" },
      { type: 'XPATH', value: "//textarea[@id='audience-blacklist-naicsCodes']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/a_Audiences_SaveSettingsTab': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='audience-create-save-nav-link']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-save-nav-link" },
      { type: 'XPATH', value: "//a[@id='audience-create-save-nav-link']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/button_Audiences_SaveSettings_AdvancedSettings': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-test-id=\"audience-create-save-settings-advance-settings-accordion\"]"
    },
    selectors: [
      { type: 'CSS', value: "span.ad-icon-add.ad-icon-primary-s2.ng-star-inserted" },
      { type: 'XPATH', value: "//div[@data-test-id=\"audience-create-save-settings-advance-settings-accordion\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/button_Audiences_SaveSettings_BackfillSegmentAdd': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='audience-create-save-add-backfill-1']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-save-add-backfill-1" },
      { type: 'XPATH', value: "//button[@id='audience-create-save-add-backfill-1']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_BackendImagePixel': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-create-save-pixel']"
    },
    selectors: [
      { type: 'CSS', value: "div.d-flex.custom-control.custom-switch.align-items-center.justify-content-between.p-0.w-100.ng-star-inserted > div.d-flex.flex-grow-1 > label.custom-control-label > span.custom-switch-label-value" },
      { type: 'XPATH', value: "//input[@id='audience-create-save-pixel']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_BackfillSegment_EndDate': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='end']"
    },
    selectors: [
      { type: 'CSS', value: "#end" },
      { type: 'XPATH', value: "//input[@id='end']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_BackfillSegment_StartDate': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='start']"
    },
    selectors: [
      { type: 'CSS', value: "#start" },
      { type: 'XPATH', value: "//input[@id='start']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_BackfillSegment_UserExpiration': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-create-save-expiration']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-save-expiration" },
      { type: 'XPATH', value: "//input[@id='audience-create-save-expiration']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_CustomImageURL': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-create-save-custom-image-url']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-save-custom-image-url" },
      { type: 'XPATH', value: "//input[@id='audience-create-save-custom-image-url']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_CustomJavascriptURL': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-create-save-custom-Javascript-url']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-save-custom-Javascript-url" },
      { type: 'XPATH', value: "//input[@id='audience-create-save-custom-Javascript-url']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_ExpirationDate': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='date']"
    },
    selectors: [
      { type: 'CSS', value: "#date" },
      { type: 'XPATH', value: "//input[@id='date']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_GenerateMatchedOrgIPCountReport': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-create-save-matched-org']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='audience-create-save-matched-org']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_IPStats': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-create-save-ip-stats']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='audience-create-save-ip-stats']" },
      { type: 'CSS', value: "" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_IPsOnlyReport': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-create-save-ips-only']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='audience-create-save-ips-only']" },
      { type: 'CSS', value: "" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_PrimaryAddressOnly': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-create-save-primaryAddress']"
    },
    selectors: [
      { type: 'CSS', value: "label > span" },
      { type: 'XPATH', value: "//input[@id='audience-create-save-primaryAddress']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_SegmentName': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"audience-create-save-name\"]"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-save-name" },
      { type: 'XPATH', value: "//input[@id=\"audience-create-save-name\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_Status': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-create-save-status']"
    },
    selectors: [
      { type: 'CSS', value: "span.custom-switch-label-value.ng-star-inserted" },
      { type: 'XPATH', value: "//input[@id='audience-create-save-status']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/label_Audiences_SaveSettings_GenerateMatchedOrgIPCountReport': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[@for='audience-create-save-matched-org']"
    },
    selectors: [
      { type: 'XPATH', value: "//label[@for='audience-create-save-matched-org']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/label_Audiences_SaveSettings_IPStats': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"audience-create-save-ip-stats\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"audience-create-save-ip-stats\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/label_Audiences_SaveSettings_IPsOnlyReport': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[@for='audience-create-save-ips-only']/span"
    },
    selectors: [
      { type: 'XPATH', value: "//label[@for='audience-create-save-ips-only']/span" },
      { type: 'CSS', value: "" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/label_Audiences_SaveSettings_PrimaryAddressOnly': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[@for='audience-create-save-primaryAddress']"
    },
    selectors: [
      { type: 'CSS', value: "label > span" },
      { type: 'XPATH', value: "//label[@for='audience-create-save-primaryAddress']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/select_Activation_Source': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='test']"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//select[@id='test']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/select_Audiences_1stParty_SaveSettings_BackfillSegment_LookbackWindow': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='audience-create-save-backFillSelect']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-save-backFillSelect" },
      { type: 'XPATH', value: "//select[@id='audience-create-save-backFillSelect']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/select_Audiences_SaveSettings_BackfillSegment_UserExpiration': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"audience-create-save-expiration\"]"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-save-match-type" },
      { type: 'XPATH', value: "//input[@id=\"audience-create-save-expiration\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/span_Audiences_1stParty_SaveSettings_BackfillSegment_Save': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id='audience-create-save-add-backfill-value']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-save-add-backfill-value" },
      { type: 'XPATH', value: "//span[@id='audience-create-save-add-backfill-value']" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/span_Audiences_1stParty_SaveSettings_BackfillSegment_SetCustomDateRange': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Optional'])[1]/following::span[2]"
    },
    selectors: [
      { type: 'CSS', value: "span.text-sm.text-range-type.ml-auto.mb-2.mr-1.ng-star-inserted" },
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Optional'])[1]/following::span[2]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/span_Audiences_SaveSettings_BackendImagePixel': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[@for='audience-create-save-pixel']/span"
    },
    selectors: [
      { type: 'CSS', value: "div.d-flex.custom-control.custom-switch.align-items-center.justify-content-between.p-0.w-100.ng-star-inserted > div.d-flex.flex-grow-1 > label.custom-control-label > span.custom-switch-label-value" },
      { type: 'XPATH', value: "//label[@for='audience-create-save-pixel']/span" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/span_Audiences_SaveSettings_BackfillSegmentValue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[@for = 'backfill']//span[@class = \"date-text ng-star-inserted\" or @class = \"text-muted ng-star-inserted\"]"
    },
    selectors: [
      { type: 'CSS', value: "span.date-text.ng-star-inserted" },
      { type: 'XPATH', value: "//label[@for = 'backfill']//span[@class = \"date-text ng-star-inserted\" or @class = \"text-muted ng-star-inserted\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/span_Audiences_SaveSettings_Status': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[@for='audience-create-save-status']/span"
    },
    selectors: [
      { type: 'CSS', value: "span.custom-switch-label-value.ng-star-inserted" },
      { type: 'XPATH', value: "//label[@for='audience-create-save-status']/span" },
    ]
  },
  'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/textarea_Audiences_SaveSettings_CustomHTML': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id='audience-create-save-custom-Html']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-save-custom-Html" },
      { type: 'XPATH', value: "//textarea[@id='audience-create-save-custom-Html']" },
    ]
  },
  'Object Repository/Frontend/Audiences/Custom Dimension Continue Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='audience-order-assoc-modal-continue']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='audience-order-assoc-modal-continue']" },
      { type: 'CSS', value: "#audience-order-assoc-modal-continue" },
    ]
  },
  'Object Repository/Frontend/Audiences/Custom Dimension Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-import-new-header-name']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='audience-import-new-header-name']" },
      { type: 'CSS', value: "#audience-import-new-header-name" },
    ]
  },
  'Object Repository/Frontend/Audiences/International Targeting No Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"ip-segment-international-targeting-toggle-no\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//button[@id=\"ip-segment-international-targeting-toggle-no\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/International Targeting Yes Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"ip-segment-international-targeting-toggle-yes\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//button[@id=\"ip-segment-international-targeting-toggle-yes\"]" },
    ]
  },
  'Object Repository/Frontend/Audiences/New Custom Dimension Span': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//span[text()=\"New Custom Dimension\"][../span[contains(@class, 'ad-icon-add')]])"
    },
    selectors: [
      { type: 'XPATH', value: "(//span[text()=\"New Custom Dimension\"][../span[contains(@class, 'ad-icon-add')]])" },
    ]
  },
  'Object Repository/Frontend/Audiences/a_ActivateAudience': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='audience-list-add-audience-link']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-list-add-audience-link" },
      { type: 'XPATH', value: "//a[@id='audience-list-add-audience-link']" },
    ]
  },
  'Object Repository/Frontend/Audiences/a_AudiencesTab': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='header-audiences-link']"
    },
    selectors: [
      { type: 'CSS', value: "#header-audiences-link" },
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//a[@id='header-audiences-link']" },
    ]
  },
  'Object Repository/Frontend/Audiences/button_Audiences_CreateLiveAudience': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='audience-create-submit-audience' and text() = 'Create Live Audience']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-submit-audience" },
      { type: 'XPATH', value: "//button[@id='audience-create-submit-audience' and text() = 'Create Live Audience']" },
    ]
  },
  'Object Repository/Frontend/Audiences/button_Audiences_SaveAsDraft': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='audience-create-draft-audience' and contains(., 'Save As Draft')]"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-draft-audience" },
      { type: 'XPATH', value: "//button[@id='audience-create-draft-audience' and contains(., 'Save As Draft')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/button_Audiences_Update': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='audience-create-submit-audience' and text() = 'Update']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-submit-audience" },
      { type: 'XPATH', value: "//button[@id='audience-create-submit-audience' and text() = 'Update']" },
    ]
  },
  'Object Repository/Frontend/Audiences/button_Audiences_UpdateDraft': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='audience-create-draft-audience' and contains(., 'Update Draft')]"
    },
    selectors: [
      { type: 'CSS', value: "#audience-create-draft-audience" },
      { type: 'XPATH', value: "//button[@id='audience-create-draft-audience' and contains(., 'Update Draft')]" },
    ]
  },
  'Object Repository/Frontend/Audiences/h1_Audiences': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='https://ali.addaptive.com'])[1]/following::h1[1]"
    },
    selectors: [
      { type: 'CSS', value: "h1.flex-grow-1" },
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='https://ali.addaptive.com'])[1]/following::h1[1]" },
    ]
  },
  'Object Repository/Frontend/Generic Modal Continue Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//ngb-modal-window//button[text()=\"Save Changes\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//ngb-modal-window//button[text()=\"Save Changes\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Generic/Backend Link': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[contains(@class, 'api-host')]"
    },
    selectors: [
      { type: 'XPATH', value: "//span[contains(@class, 'api-host')]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Generic/Footer Links': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//footer//ul//li//a"
    },
    selectors: [
      { type: 'XPATH', value: "//footer//ul//li//a" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Generic/Generic Modal Results Span': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//div[contains(@class, 'pagination-container')]//span)[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(//div[contains(@class, 'pagination-container')]//span)[1]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Generic/Generic Modal': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='generic-confirm-modal-continue']"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//button[@id='generic-confirm-modal-continue']" },
    ]
  },
  'Object Repository/Frontend/Generic/Manage Users Link': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='header-manage-users-link']"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id='header-manage-users-link']" },
      { type: 'CSS', value: "#header-manage-users-link" },
    ]
  },
  'Object Repository/Frontend/Generic/Navbar Links': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//header//nav//ul//li//a"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//header//nav//ul//li//a" },
    ]
  },
  'Object Repository/Frontend/Generic/Tools Icon': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='header-toolbox-dropdown-toggle']/img"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id='header-toolbox-dropdown-toggle']/img" },
      { type: 'CSS', value: "#header-toolbox-dropdown-toggle > img" },
    ]
  },
  'Object Repository/Frontend/Impersonate-User/Exit Impersonation': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id=\"header-exit-impersonate\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//span[@id=\"header-exit-impersonate\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Impersonate-User/Impersonate User Modal': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-modal-impersonate"
    },
    selectors: [
      { type: 'XPATH', value: "//app-modal-impersonate" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Impersonate-User/button_Switch to User': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"modal-impersonate-switch\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"modal-impersonate-switch\"]" },
      { type: 'CSS', value: "button.btn.btn-primary.btn-sm" },
    ]
  },
  'Object Repository/Frontend/Impersonate-User/img_MainMenu_ImporsonateUserIcon': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//li/a/img"
    },
    selectors: [
      { type: 'CSS', value: "a.dropdown-toggle.nav-item.ico > img" },
      { type: 'XPATH', value: "//li/a/img" },
    ]
  },
  'Object Repository/Frontend/Impersonate-User/img_impersonate svg icon': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='header-impersonate']"
    },
    selectors: [
      { type: 'CSS', value: "#header-impersonate > img" },
      { type: 'XPATH', value: "//a[@id='header-impersonate']" },
    ]
  },
  'Object Repository/Frontend/Impersonate-User/input_ImpersonateUserEmail': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='modal-impersonate-search']"
    },
    selectors: [
      { type: 'CSS', value: "#modal-impersonate-search" },
      { type: 'XPATH', value: "//input[@id='modal-impersonate-search']" },
    ]
  },
  'Object Repository/Frontend/Impersonate-User/span_ImporsonateUserDropdownSelection': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='ngb-typeahead-0-0']/ngb-highlight/span"
    },
    selectors: [
      { type: 'CSS', value: "span.ngb-highlight.ng-star-inserted" },
      { type: 'XPATH', value: "//button[@id='ngb-typeahead-0-0']/ngb-highlight/span" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Add Dynamic Filter Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-report-builder-data-selection-modal//button[text()=\"Add\"]"
    },
    selectors: [
      { type: 'CSS', value: "div.col-5" },
      { type: 'XPATH', value: "//app-report-builder-data-selection-modal//button[text()=\"Add\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Add Recipient Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@data-test-id=\"add-email-recipient-btn\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//button[@data-test-id=\"add-email-recipient-btn\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Blank Report': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[text()=\"Blank Report\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[text()=\"Blank Report\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Confirm Immediate Report Btn': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@type = 'button' and (text() = 'Yes, send Immediate Report' or . = 'Yes, send Immediate Report')]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@type = 'button' and (text() = 'Yes, send Immediate Report' or . = 'Yes, send Immediate Report')]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Create Report Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@href = '/insight-studio/create' and (text() = 'Create Report' or . = 'Create Report')]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@href = '/insight-studio/create' and (text() = 'Create Report' or . = 'Create Report')]" },
      { type: 'CSS', value: "a.btn.btn-primary-80.text-white.btn-shadow.mx-2" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Create Report Settings/Create Report Settings Cog': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id='report-builder-settings-cog']"
    },
    selectors: [
      { type: 'CSS', value: "#report-builder-settings-cog" },
      { type: 'XPATH', value: "//span[@id='report-builder-settings-cog']" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Create Report Settings/Export Name Tag': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[contains(@class, 'badge') and text() = \"${tagName}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[contains(@class, 'badge') and text() = \"${tagName}\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Create Report Settings/Itemized Reporting Toggle': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"report-settings-toggle\"]/following-sibling::label"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"report-settings-toggle\"]/following-sibling::label" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Customize Report Tab': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id=\"report-builder-nav-customize\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id=\"report-builder-nav-customize\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Add Data Source Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='report-builder-create-edit-new-source']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='report-builder-create-edit-new-source']" },
      { type: 'CSS', value: "#report-builder-create-edit-new-source" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Air Config Group Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='brand-safety-type']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='brand-safety-type']" },
      { type: 'CSS', value: "#brand-safety-type" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Air Config Searchbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='cpm-value']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='cpm-value']" },
      { type: 'CSS', value: "#cpm-value" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/All Operator Selecter': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[contains(text(),'ALL')]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[contains(text(),'ALL')]" },
      { type: 'CSS', value: "a.badge.mr-1.shadow-sm.text-white.badge-primary" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Any Operator Selecter': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[contains(text(),'ANY')]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[contains(text(),'ANY')]" },
      { type: 'CSS', value: "a.badge.shadow-sm.text-addaptive-blue.badge-light" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Custom Range Start Date Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='cadenceStartDate-${dataSourceIndex}']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='cadenceStartDate-${dataSourceIndex}']" },
      { type: 'CSS', value: "div.form-group.mb-0 > #cadenceStartDate-0" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Custom Range Start End Date Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='cadenceEndDate-${dataSourceIndex}']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='cadenceEndDate-${dataSourceIndex}']" },
      { type: 'CSS', value: "div.form-group.mb-0 > #cadenceEndDate-0" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Custom Start Date End Date Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='End Date'])[${dataSourceIndex}]/following::select[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='End Date'])[${dataSourceIndex}]/following::select[1]" },
      { type: 'CSS', value: "select.custom-select.ng-tns-c195-3.ng-untouched.ng-pristine.ng-valid" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Custom Start Date Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"cadenceCustomStartDate-${index}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"cadenceCustomStartDate-${index}\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Data Selection Continue Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@data-test-id=\"data-selection-continue-btn\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@data-test-id=\"data-selection-continue-btn\"]" },
      { type: 'CSS', value: "button.btn.btn-primary.mr-1.float-left" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Data Selection Dynamic Filter Tab': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='dynamic-filter-nav-link']"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id='dynamic-filter-nav-link']" },
      { type: 'CSS', value: "#dynamic-filter-nav-link" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Data Selection Line Item Search Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='cpm-value']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='cpm-value']" },
      { type: 'CSS', value: "#cpm-value" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Data Source Date Range Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@data-test-id=\"report-builder-create-edit-custom-range-${index}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@data-test-id=\"report-builder-create-edit-custom-range-${index}\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Data Source Modal Selection Span': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//span[@class=\"action\"])[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(//span[@class=\"action\"])[1]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Data Source Select Data Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"report-builder-create-edit-select-data-${index}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"report-builder-create-edit-select-data-${index}\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Data Source Type Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"report-builder-datasource-type-${index}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id=\"report-builder-datasource-type-${index}\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Data Source': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-report-builder-create-edit-datasource"
    },
    selectors: [
      { type: 'XPATH', value: "//app-report-builder-create-edit-datasource" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Delete Data Source Icon': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id='report-builder-create-edit-datasource-delete-${index}']/div[2]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//span[@id='report-builder-create-edit-datasource-delete-${index}']/div[2]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Dynamic Filter Searchbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='dynamic-filter-search']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='dynamic-filter-search']" },
      { type: 'CSS', value: "#dynamic-filter-search" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Filters Dimension Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"df-dimension-select\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id=\"df-dimension-select\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Filters Operator Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"dynamic-filter-operator\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id=\"dynamic-filter-operator\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Relative Date Range Timeframe Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"report-builder-create-edit-datasource-timeframe-${index}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id=\"report-builder-create-edit-datasource-timeframe-${index}\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Relative Date Range Timeframe Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"report-builder-create-edit-data-source-timeframe-value-${index}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"report-builder-create-edit-data-source-timeframe-value-${index}\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Remove Filter Icon': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[text()=\"${filter}\"]//following-sibling::span[contains(@class, 'remove-rule')]"
    },
    selectors: [
      { type: 'XPATH', value: "//span[text()=\"${filter}\"]//following-sibling::span[contains(@class, 'remove-rule')]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Select Config Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='report-builder-create-edit-select-config-${index}']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='report-builder-create-edit-select-config-${index}']" },
      { type: 'CSS', value: "#report-builder-create-edit-select-config-0" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Selected Line Item Div': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[contains(@class, 'list-item') and contains(@class, 'is-selected')]"
    },
    selectors: [
      { type: 'XPATH', value: "//div[contains(@class, 'list-item') and contains(@class, 'is-selected')]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/Add Filter Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-report-builder-data-selection-modal//button[text()=\"Add\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//app-report-builder-data-selection-modal//button[text()=\"Add\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/Advertiser Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@data-test-id=\"report-builder-create-edit-site-analytics-v2-advertiser-${index}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@data-test-id=\"report-builder-create-edit-site-analytics-v2-advertiser-${index}\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/Configure Filters Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"report-builder-create-edit-select-site-analytics-v2-config-filters-${index}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"report-builder-create-edit-select-site-analytics-v2-config-filters-${index}\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/Data Selection Continue Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@data-test-id=\"data-selection-continue-btn\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@data-test-id=\"data-selection-continue-btn\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/Dynamic Filter Dimension Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='df-dimension-select']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='df-dimension-select']" },
      { type: 'CSS', value: "#df-dimension-select" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/Dynamic Filter Operator Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='dynamic-filter-operator']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='dynamic-filter-operator']" },
      { type: 'CSS', value: "#dynamic-filter-operator" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/Group All Operator': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-report-builder-data-selection-modal//a[text()=\"ALL\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//app-report-builder-data-selection-modal//a[text()=\"ALL\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/Group Any Operator': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-report-builder-data-selection-modal//a[text()=\"ANY\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//app-report-builder-data-selection-modal//a[text()=\"ANY\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/Link Unlink Advertiser Item': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-test-id=\"link-unlink-sav2-datasources-${index}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@data-test-id=\"link-unlink-sav2-datasources-${index}\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/Match Value Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"dynamic-filter-url-input\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"dynamic-filter-url-input\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/URL Exclusion Tab': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id=\"dynamic-filter-nav-link\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id=\"dynamic-filter-nav-link\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/URL Inclusion Tab': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id=\"add-data-source-nav-link\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//a[@id=\"add-data-source-nav-link\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Data Sources/URL Exclusion Tab Link': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id=\"dynamic-filter-nav-link\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id=\"dynamic-filter-nav-link\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Email Subjects/Add Recipient Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@data-test-id=\"add-email-recipient-btn\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@data-test-id=\"add-email-recipient-btn\"]" },
      { type: 'CSS', value: "button.btn.btn-primary-80.w-100.text-white" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Email Subjects/Recipient Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@data-test-id=\"email-recipient-input\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@data-test-id=\"email-recipient-input\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Email Subjects/Recipient Type Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@data-test-id=\"email-recipient-type-dropdown\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@data-test-id=\"email-recipient-type-dropdown\"]" },
      { type: 'CSS', value: "select.custom-select.dark.p-0.pl-3.ng-untouched.ng-pristine.ng-valid" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Export Targets/Add Export Target Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='report-builder-add-export-targets']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='report-builder-add-export-targets']" },
      { type: 'CSS', value: "#report-builder-add-export-targets" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Export Targets/Delete Export Div': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id=\"report-builder-create-edit-export-delete-${index}\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//div[@id=\"report-builder-create-edit-export-delete-${index}\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Export Targets/Export Target Type Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='report-builder-create-edit-export-select-${index}']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='report-builder-create-edit-export-select-${index}']" },
      { type: 'CSS', value: "#report-builder-create-edit-export-select-0" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/File Type Dropdown Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@aria-label=\"${fileType}\"]"
    },
    selectors: [
      { type: 'CSS', value: "span.dropdown-btn" },
      { type: 'XPATH', value: "//input[@aria-label=\"${fileType}\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/File Type Dropdown LI': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//ng-multiselect-dropdown[@data-test-id=\"file-type-dropdown\"]//li[input[@aria-label='${fileType}']]"
    },
    selectors: [
      { type: 'CSS', value: "li.multiselect-item-checkbox.ng-star-inserted > div" },
      { type: 'XPATH', value: "//ng-multiselect-dropdown[@data-test-id=\"file-type-dropdown\"]//li[input[@aria-label='${fileType}']]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/File Type Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//ng-multiselect-dropdown[@data-test-id=\"file-type-dropdown\"]//span[contains(@class, 'dropdown-multiselect__caret')]"
    },
    selectors: [
      { type: 'XPATH', value: "//ng-multiselect-dropdown[@data-test-id=\"file-type-dropdown\"]//span[contains(@class, 'dropdown-multiselect__caret')]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/First Report Edit Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//a[contains(@class, 'ad-icon-edit')])[1]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//a[contains(@class, 'ad-icon-edit')])[1]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Navbar Insight Studio Link': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@href = '/insight-studio' and (text() = 'Insight Studio' or . = 'Insight Studio')]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@href = '/insight-studio' and (text() = 'Insight Studio' or . = 'Insight Studio')]" },
      { type: 'CSS', value: "div.sub-dropdown-menu.dropdown-menu.ng-star-inserted.show > ul > li:nth-of-type(2) > a" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Navbar Reports Link': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='header-reports-link']"
    },
    selectors: [
      { type: 'CSS', value: "#header-reports-dropdown-toggle" },
      { type: 'XPATH', value: "//a[@id='header-reports-link']" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Recipient Delete Span': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id=\"remove-email-${index}\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//span[@id=\"remove-email-${index}\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Recipient Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@data-test-id=\"email-recipient-input\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@data-test-id=\"email-recipient-input\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Report Cadences/Cadence Date Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"cadenceOneTime\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"cadenceOneTime\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Report Cadences/Cadence Day Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"report-builder-cadence-day\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id=\"report-builder-cadence-day\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Report Cadences/Cadence Day of Month Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"report-builder-cadence-day-of-month\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id=\"report-builder-cadence-day-of-month\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Report Cadences/Cadence Stop Sending Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='candenceEndDate']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='candenceEndDate']" },
      { type: 'CSS', value: "div.form-group.mb-0 > #candenceEndDate" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Report Cadences/Cadence Time Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"cadenceTime\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"cadenceTime\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Report Cadences/Report Cadence Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='report-builder-create-edit-cadence']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='report-builder-create-edit-cadence']" },
      { type: 'CSS', value: "div.form-group.mb-0 > #candenceEndDate" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Report Name Field': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='report-builder-create-edit-name']"
    },
    selectors: [
      { type: 'CSS', value: "#report-builder-create-edit-name" },
      { type: 'XPATH', value: "//input[@id='report-builder-create-edit-name']" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Report Searchbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//input[@type='search'])[2]"
    },
    selectors: [
      { type: 'CSS', value: "input.form-control.ng-pristine.ng-valid.ng-touched" },
      { type: 'XPATH', value: "(//input[@type='search'])[2]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Report Template Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='report-builder-create-edit-profile']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='report-builder-create-edit-profile']" },
      { type: 'CSS', value: "#report-builder-create-edit-profile" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Row Limit Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@data-test-id=\"widget-settings-row-limit-csv\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@data-test-id=\"widget-settings-row-limit-csv\"]" },
      { type: 'CSS', value: "div.col-6.ng-star-inserted > div.form-group.w-100 > div.custom-select-parent > select.custom-select.ng-untouched.ng-pristine.ng-valid" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Save Report Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@data-test-id=\"save-report-btn\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@data-test-id=\"save-report-btn\"]" },
      { type: 'CSS', value: "button.btn.btn-primary.ng-tns-c193-3" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Status Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"report-builder-create-edit-status\"]/parent::div"
    },
    selectors: [
      { type: 'CSS', value: "label.custom-control-label" },
      { type: 'XPATH', value: "//input[@id=\"report-builder-create-edit-status\"]/parent::div" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Add New Widget Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[contains(@class, 'add-widget')]"
    },
    selectors: [
      { type: 'XPATH', value: "//div[contains(@class, 'add-widget')]" },
      { type: 'CSS', value: "div.add-widget.d-flex.justify-content-center.py-3.w-100.my-3" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Add New Widget Filter Link': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@data-test-id=\"add-new-filer-rule\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@data-test-id=\"add-new-filer-rule\"]" },
      { type: 'CSS', value: "div.mb-1.mr-3.d-flex.flex-row.justify-content-end > a" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Delete Widget Icon': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@data-test-id=\"delete-widget-${index}\"]"
    },
    selectors: [
      { type: 'CSS', value: "span.ad-icon-trashcan.ad-icon-primary-s1" },
      { type: 'XPATH', value: "//span[@data-test-id=\"delete-widget-${index}\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Edit Widget Icon': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@data-test-id=\"edit-widget-${index}\"]"
    },
    selectors: [
      { type: 'CSS', value: "span.ad-icon-edit.ad-icon-primary-s1" },
      { type: 'XPATH', value: "//span[@data-test-id=\"edit-widget-${index}\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Unknown Accounts Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@data-test-id=\"widget-settings-display-unknown-accounts\"]/following::label[@for=\"is-filter-unresolved-accounts\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@data-test-id=\"widget-settings-display-unknown-accounts\"]/following::label[@for=\"is-filter-unresolved-accounts\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Unknown Dimension Values Label': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@data-test-id=\"widget-settings-display-unknown-dimension-values\"]//following-sibling::label"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@data-test-id=\"widget-settings-display-unknown-dimension-values\"]//following-sibling::label" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Unresolved Business Name Label': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@data-test-id=\"widget-settings-display-unknown-accounts\"]//following-sibling::label"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@data-test-id=\"widget-settings-display-unknown-accounts\"]//following-sibling::label" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Apply Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@data-test-id=\"widget-apply-btn\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@data-test-id=\"widget-apply-btn\"]" },
      { type: 'CSS', value: "button.btn.btn-primary.flex-grow-1.mr-1" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Content Textarea': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//body/p"
    },
    selectors: [
      { type: 'XPATH', value: "//body/p" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Data Source Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"'report-builder-widget-edit-datasource'\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id=\"'report-builder-widget-edit-datasource'\"]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Dimension Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@data-test-id=\"chart-dimensions-selection\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@data-test-id=\"chart-dimensions-selection\"]" },
      { type: 'CSS', value: "select.custom-select.ng-pristine.ng-valid.ng-touched" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Dimension Multiselector': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-column-selection[@data-test-id=\"table-dimensions-selection\"]//gridster-item//span[contains(text(), '${dimensionName}')]"
    },
    selectors: [
      { type: 'XPATH', value: "//app-column-selection[@data-test-id=\"table-dimensions-selection\"]//gridster-item//span[contains(text(), '${dimensionName}')]" },
      { type: 'CSS', value: "div.position-relative.w-100.h-100.d-flex.selected.flex-row.justify-content-between.px-2.align-items-center.item" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Filter Action Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@data-test-id=\"widget-filter-action-${index}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@data-test-id=\"widget-filter-action-${index}\"]" },
      { type: 'CSS', value: "select.custom-select.pl-1.py-1.ng-untouched.ng-pristine.ng-valid" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Filter Column Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@data-test-id=\"widget-filter-column-${index}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@data-test-id=\"widget-filter-column-${index}\"]" },
      { type: 'CSS', value: "select.custom-select.pl-1.py-1.ng-untouched.ng-pristine.ng-valid" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Filter Value Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-test-id=\"filer-select-${index}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@data-test-id=\"filer-select-${index}\"]" },
      { type: 'CSS', value: "div.w-100.d-flex.justify-content-start.filter-value.py-2.pl-2.text-center" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Filter Value Range Maximum Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='max']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='max']" },
      { type: 'CSS', value: "#max" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Filter Value Range Minimum Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@data-test-id=\"widget-filter-value-range-minimum-${index}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@data-test-id=\"widget-filter-value-range-minimum-${index}\"]" },
      { type: 'CSS', value: "#min" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Metric Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Metric'])[1]/following::select[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Metric'])[1]/following::select[1]" },
      { type: 'CSS', value: "div.form-group.w-100.ng-star-inserted > div.custom-select-parent > select.custom-select.ng-untouched.ng-pristine.ng-valid" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Metrics Multiselector': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-column-selection[@data-test-id=\"table-metric-selection\"]//gridster-item//span[contains(text(), '${metricName}')]"
    },
    selectors: [
      { type: 'XPATH', value: "//app-column-selection[@data-test-id=\"table-metric-selection\"]//gridster-item//span[contains(text(), '${metricName}')]" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Order Setting Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@data-test-id=\"widget-settings-order\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@data-test-id=\"widget-settings-order\"]" },
      { type: 'CSS', value: "div.col > div.form-group.w-100 > div.custom-select-parent > select.custom-select.ng-untouched.ng-pristine.ng-valid" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Settings Interval Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@data-test-id=\"widget-settings-interval\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@data-test-id=\"widget-settings-interval\"]" },
      { type: 'CSS', value: "div.form-group.col.ng-star-inserted > div.custom-select-parent > select.custom-select.ng-untouched.ng-pristine.ng-valid" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Settings Sizing Full Width': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-test-id=\"widget-settings-full-width\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@data-test-id=\"widget-settings-full-width\"]" },
      { type: 'CSS', value: "div.d-flex.flex-column.sizing.px-2.py-1.selected" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Settings Sizing Half Width': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-test-id=\"widget-settings-half-width\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@data-test-id=\"widget-settings-half-width\"]" },
      { type: 'CSS', value: "div.d-flex.flex-column.sizing.ml-1.px-2.py-1.ng-star-inserted" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Settings Table Total Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@data-test-id=\"widget-settings-table-total\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@data-test-id=\"widget-settings-table-total\"]" },
      { type: 'CSS', value: "#total-row-dropdown" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Sort By Setting Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@data-test-id=\"widget-settings-sort-by\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@data-test-id=\"widget-settings-sort-by\"]" },
      { type: 'CSS', value: "div.col > div.form-group.w-100 > div.custom-select-parent > select.custom-select.ng-untouched.ng-pristine.ng-valid" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Textarea iFrame': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//editor//iframe"
    },
    selectors: [
      { type: 'XPATH', value: "//editor//iframe" },
    ]
  },
  'Object Repository/Frontend/Insight Studio/Widgets/Widget Type Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@data-test-id=\"widget-type\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@data-test-id=\"widget-type\"]" },
      { type: 'CSS', value: "select.custom-select.ng-valid.ng-dirty.ng-touched" },
    ]
  },
  'Object Repository/Frontend/Lists-InventoryList/a_Lists': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='header-lists-dropdown-toggle']"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id='header-lists-dropdown-toggle']" },
      { type: 'CSS', value: "#header-lists-dropdown-toggle" },
    ]
  },
  'Object Repository/Frontend/Lists-InventoryList/a_Lists_InventoryLists': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='header-lists-dropdown-toggle']"
    },
    selectors: [
      { type: 'CSS', value: "#header-inventory-lists-link" },
      { type: 'XPATH', value: "//a[@id='header-lists-dropdown-toggle']" },
    ]
  },
  'Object Repository/Frontend/Lists-InventoryList/a_Lists_InventoryLists_Create_an_Inventory_List': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='inventory-list-create-link']"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id='inventory-list-create-link']" },
      { type: 'CSS', value: "#inventory-list-create-link" },
    ]
  },
  'Object Repository/Frontend/Lists-InventoryList/a_Lists_InventoryLists_ListItem_Name': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='inventory-list-item-header-edit-link-${itemNo}']"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id='inventory-list-item-header-edit-link-${itemNo}']" },
      { type: 'CSS', value: "#inventory-list-item-header-edit-link-0" },
    ]
  },
  'Object Repository/Frontend/Lists-InventoryList/button_Lists_InventoryLists_AdServer_DPM': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='inventory-list-create-adserver-dpm']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='inventory-list-create-adserver-dpm']" },
      { type: 'CSS', value: "#inventory-list-create-adserver-pmp" },
    ]
  },
  'Object Repository/Frontend/Lists-InventoryList/button_Lists_InventoryLists_AdServer_PMP': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='inventory-list-create-adserver-pmp']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='inventory-list-create-adserver-pmp']" },
      { type: 'CSS', value: "#inventory-list-create-adserver-pmp" },
    ]
  },
  'Object Repository/Frontend/Lists-InventoryList/button_Lists_InventoryLists_ExclusionList': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='inventory-list-create-exclusion']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='inventory-list-create-exclusion']" },
      { type: 'CSS', value: "#inventory-list-create-exclusion" },
    ]
  },
  'Object Repository/Frontend/Lists-InventoryList/button_Lists_InventoryLists_InclusionList': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='inventory-list-create-inclusion']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='inventory-list-create-inclusion']" },
      { type: 'CSS', value: "#inventory-list-create-inclusion" },
    ]
  },
  'Object Repository/Frontend/Lists-InventoryList/button_Lists_InventoryLists_SaveList': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='inventory-list-create-save']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='inventory-list-create-save']" },
      { type: 'CSS', value: "#inventory-list-create-save" },
    ]
  },
  'Object Repository/Frontend/Lists-InventoryList/input_Lists_InventoryLists_FileUpload': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@type = 'file' and @id = 'inventory-list-create-upload']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@type = 'file' and @id = 'inventory-list-create-upload']" },
      { type: 'CSS', value: "#inventory-list-create-upload" },
    ]
  },
  'Object Repository/Frontend/Lists-InventoryList/input_Lists_InventoryLists_Search_SearchText': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='inventory-list-filter-search']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='inventory-list-filter-search']" },
      { type: 'CSS', value: "#inventory-list-filter-search" },
    ]
  },
  'Object Repository/Frontend/Lists-InventoryList/input_Lists_InvetoryLists_PMP_ListName': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='inventory-list-create-name']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='inventory-list-create-name']" },
      { type: 'CSS', value: "#inventory-list-create-name" },
    ]
  },
  'Object Repository/Frontend/Lists-InventoryList/select_Lists_InventoryLists_Search_Type': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='inventory-list-listType']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='inventory-list-listType']" },
      { type: 'CSS', value: "#inventory-list-listType" },
    ]
  },
  'Object Repository/Frontend/Login-Page/Page_AdDaptive Intelligence/button_Login': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='login-submit']"
    },
    selectors: [
      { type: 'CSS', value: "#login-submit" },
      { type: 'XPATH', value: "//button[@id='login-submit']" },
    ]
  },
  'Object Repository/Frontend/Login-Page/Page_AdDaptive Intelligence/input_Login_passwordInput': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='login-passwordInput']"
    },
    selectors: [
      { type: 'CSS', value: "#login-passwordInput" },
      { type: 'XPATH', value: "//input[@id='login-passwordInput']" },
    ]
  },
  'Object Repository/Frontend/Login-Page/Page_AdDaptive Intelligence/input_Login_usernameInput': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='login-usernameInput']"
    },
    selectors: [
      { type: 'CSS', value: "#login-usernameInput" },
      { type: 'XPATH', value: "//input[@id='login-usernameInput']" },
    ]
  },
  'Object Repository/Frontend/Login-Page/buttonLogin': {
    kind: 'web',
    selectorMethod: 'BASIC',
    preferred: {
      type: 'BASIC',
      value: "//button[@type = 'submit' and (text() = 'Login' or . = 'Login')]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@type='submit']" },
      { type: 'CSS', value: "button.btn.btn-primary" },
      { type: 'BASIC', value: "//button[@type = 'submit' and (text() = 'Login' or . = 'Login')]" },
    ]
  },
  'Object Repository/Frontend/Login-Page/inputPassword': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='login-passwordInput']"
    },
    selectors: [
      { type: 'CSS', value: "#passwordInput" },
      { type: 'XPATH', value: "//input[@id='login-passwordInput']" },
    ]
  },
  'Object Repository/Frontend/Login-Page/inputUserName': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='login-usernameInput']"
    },
    selectors: [
      { type: 'CSS', value: "#usernameInput" },
      { type: 'XPATH', value: "//input[@id='login-usernameInput']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/Audience Group': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[contains(@class, 'audience__group')][${groupIndex}]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//article[contains(@class, 'audience__group')][${groupIndex}]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/Audience Subgroup': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[contains(@class, 'audience__group')][${groupIndex}]//article[contains(@class, 'audience__subgroup')][${subgroupIndex}]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//article[contains(@class, 'audience__group')][${groupIndex}]//article[contains(@class, 'audience__subgroup')][${subgroupIndex}]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/Audience Type Popover Window': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='audience-type-dropdown']/following-sibling::ngb-popover-window"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//div[@id='audience-type-dropdown']/following-sibling::ngb-popover-window" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/Media Math/Audience Group Div': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[contains(@class,'audience__group')]\n  [.//h2[contains(@class,'audience__group-title')\n        and normalize-space()='${groupName}']]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//article[contains(@class,'audience__group')]\n  [.//h2[contains(@class,'audience__group-title')\n        and normalize-space()='${groupName}']]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/Media Math/Audience Subgroup Div': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[contains(@class,'audience__group')]\n  [.//h2[contains(@class,'audience__group-title')\n        and normalize-space()='${groupName}']]//article[contains(@class,'audience__subgroup')][${subgroupIndex}]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//article[contains(@class,'audience__group')]\n  [.//h2[contains(@class,'audience__group-title')\n        and normalize-space()='${groupName}']]//article[contains(@class,'audience__subgroup')][${subgroupIndex}]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/Media Math/Delete Audience Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[contains(@class,'audience__group')]\n  [.//h2[contains(@class,'audience__group-title') and normalize-space()='${groupName}']]\n  //article[contains(@class,'audience__subgroup')][${subgroupIndex}]\n  //div[contains(@class,'audience-item')][${audienceIndex}]\n  //button[contains(@class,'audience-item__remove')]"
    },
    selectors: [
      { type: 'XPATH', value: "//article[contains(@class,'audience__group')]\n  [.//h2[contains(@class,'audience__group-title') and normalize-space()='${groupName}']]\n  //article[contains(@class,'audience__subgroup')][${subgroupIndex}]\n  //div[contains(@class,'audience-item')][${audienceIndex}]\n  //button[contains(@class,'audience-item__remove')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/Remove Audience Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"order-entry-audience-group-${groupIndex}-subgroup-${subgroupIndex}-remove-audience-${audienceIndex}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"order-entry-audience-group-${groupIndex}-subgroup-${subgroupIndex}-remove-audience-${audienceIndex}\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/a_Audience_Tab': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='order-parent-nav-audience']"
    },
    selectors: [
      { type: 'CSS', value: "#order-parent-nav-audience" },
      { type: 'XPATH', value: "//a[@id='order-parent-nav-audience']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/article_Audience_Subgroup': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(((//article[contains(@class, 'audience__group')])[1])//article[@dnddragoverclass='audience__subgroup--dragover'])[1]"
    },
    selectors: [
      { type: 'CSS', value: "header.card-header.container.medium-gray" },
      { type: 'XPATH', value: "(((//article[contains(@class, 'audience__group')])[1])//article[@dnddragoverclass='audience__subgroup--dragover'])[1]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/button_Audeince_Group_Add': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='order-entry-audience-group-add-group']"
    },
    selectors: [
      { type: 'CSS', value: "#order-entry-audience-group-add-group" },
      { type: 'XPATH', value: "//button[@id='order-entry-audience-group-add-group']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/button_Audience_Exclude': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='order-entry-audience-list-exclude-action']"
    },
    selectors: [
      { type: 'CSS', value: "#order-entry-audience-list-exclude-action" },
      { type: 'XPATH', value: "//button[@id='order-entry-audience-list-exclude-action']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/button_Audience_Include': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='order-entry-audience-list-include-action']"
    },
    selectors: [
      { type: 'CSS', value: "#order-entry-audience-list-include-action" },
      { type: 'XPATH', value: "//button[@id='order-entry-audience-list-include-action']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/button_Audience_Subgroup_Add': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[contains(@class, 'audience__group')][${groupIndex}]//button[@id='order-entry-audience-group-add-subgroup']"
    },
    selectors: [
      { type: 'XPATH', value: "//article[contains(@class, 'audience__group')][${groupIndex}]//button[@id='order-entry-audience-group-add-subgroup']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/button_Audience_Subgroup_Delete': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "((//article[contains(@class, 'audience__group')])[${groupIndex}]//button[@id='order-entry-audience-group-remove-subgroup'])[${subgroupIndex}]"
    },
    selectors: [
      { type: 'XPATH', value: "((//article[contains(@class, 'audience__group')])[${groupIndex}]//button[@id='order-entry-audience-group-remove-subgroup'])[${subgroupIndex}]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/div_Audience_Tag': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[contains(@id, 'order-entry-audience-list-item-') and (text()='${audience}' or . ='${audience}')]"
    },
    selectors: [
      { type: 'XPATH', value: "//div[contains(@id, 'order-entry-audience-list-item-') and (text()='${audience}' or . ='${audience}')]" },
      { type: 'CSS', value: "#order-entry-audience-list-item-0" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/div_Audiences_AudienceType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='audience-type-dropdown']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='audience-type-dropdown']" },
      { type: 'CSS', value: "#audience-type-dropdown" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/div_Audiences_AudienceType_MenuItem': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//ngb-popover-window//ul//li[contains(@class, 'type-select')][normalize-space(.)=\"${audienceType}\"]"
    },
    selectors: [
      { type: 'CSS', value: "#audience-type-dropdown" },
      { type: 'XPATH', value: "//ngb-popover-window//ul//li[contains(@class, 'type-select')][normalize-space(.)=\"${audienceType}\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/input_Audience_Group_Target': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(((//article[contains(@class, 'audience__group')])[1])//article[@dnddragoverclass='audience__subgroup--dragover'])[1]//div[contains(@class, 'card-body')]"
    },
    selectors: [
      { type: 'CSS', value: "#audience-search" },
      { type: 'XPATH', value: "(((//article[contains(@class, 'audience__group')])[1])//article[@dnddragoverclass='audience__subgroup--dragover'])[1]//div[contains(@class, 'card-body')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/input_Audience_Search': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='audience-search']"
    },
    selectors: [
      { type: 'CSS', value: "#audience-search" },
      { type: 'XPATH', value: "//input[@id='audience-search']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/label_Audience_Group_Target': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//label[contains(@for, 'group-target-')])[${groupIndex}]"
    },
    selectors: [
      { type: 'XPATH', value: "(//label[contains(@for, 'group-target-')])[${groupIndex}]" },
      { type: 'CSS', value: "label.custom-control-label" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Audience-Tab/select_Audience_Type': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='order-entry-audience-list-type-filter']"
    },
    selectors: [
      { type: 'CSS', value: "#order-entry-audience-list-type-filter" },
      { type: 'XPATH', value: "//select[@id='order-entry-audience-list-type-filter']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Advertiser Dropdown Item': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='basic-setup-advertiser']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='basic-setup-advertiser']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/DFP Line Items Spinner': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[@for=\"basic-setup-line_items_ids\"]//span[contains(@class, 'spinner-border')]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//label[@for=\"basic-setup-line_items_ids\"]//span[contains(@class, 'spinner-border')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Campaign Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"basic-setup-line-item-name\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"basic-setup-line-item-name\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/IO Reference Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"basic-setup-optional-insertion-order\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@id=\"basic-setup-optional-insertion-order\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Merit Pixel Modal Edit Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"basic-setup-conversion-pixel-modal-not-dfp\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@id=\"basic-setup-conversion-pixel-modal-not-dfp\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Merit Pixel Modal Searcbox Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"conversion-pixel-modal-search\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@id=\"conversion-pixel-modal-search\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Pixel Type Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"conversion-pixel-modal-pixel-type\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//select[@id=\"conversion-pixel-modal-pixel-type\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Politcal Campaign Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"political-campaign\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@id=\"political-campaign\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Post Click Window Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"post-click-window\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"post-click-window\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Post Click Window Timeframe Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"post-click-window-timeframe\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//select[@id=\"post-click-window-timeframe\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Post Click Window Value Textbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"post-click-window-value\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"post-click-window-value\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Post View Window Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"post-view-window\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@id=\"post-view-window\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Post View Window Timeframe Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"post-view-window-timeframe\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//select[@id=\"post-view-window-timeframe\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Post View Window Value Textbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"post-view-window-value\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"post-view-window-value\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Programmatic Guaranteed Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"programmatic-guaranteed\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@id=\"programmatic-guaranteed\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Target Type B2B Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"basic-setup-target-type-b2b\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"basic-setup-target-type-b2b\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Target Type B2C Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"basic-setup-target-type-b2c\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"basic-setup-target-type-b2c\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/Curate Deal Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"basic-setup-curate-deal-name\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"basic-setup-curate-deal-name\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/DSP And Buyer Targeting Modal/Add Item Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[contains(@class, 'buyer-dsp-name') and @title=\"0 (Media Math)\"]/ancestor::td/following-sibling::td"
    },
    selectors: [
      { type: 'XPATH', value: "//span[contains(@class, 'buyer-dsp-name') and @title=\"0 (Media Math)\"]/ancestor::td/following-sibling::td" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/DSP And Buyer Targeting Modal/Buyer Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"buyer-modal-suplier\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id=\"buyer-modal-suplier\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/DSP And Buyer Targeting Modal/DSP Buyer Targeting Modal Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"basic-setup-buyer-modal\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"basic-setup-buyer-modal\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/DSP And Buyer Targeting Modal/DSP Buyer Targeting Modal Item': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[contains(@class, 'buyer-dsp-name') and @title=\"${title}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//span[contains(@class, 'buyer-dsp-name') and @title=\"${title}\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/DSP And Buyer Targeting Modal/Modal Continue Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"buyer-modal-save\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"buyer-modal-save\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/DSP And Buyer Targeting Modal/Modal Searchbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"buyer-modal-search-text\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"buyer-modal-search-text\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/DSP And Buyer Targeting Modal/Modal': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-buyer-modal"
    },
    selectors: [
      { type: 'XPATH', value: "//app-buyer-modal" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/PMP Line Item Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"basic-setup-line-item-name-pmp\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"basic-setup-line-item-name-pmp\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/Revenue Type Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='basic-setup-revenue-type-pmp']"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//select[@id='basic-setup-revenue-type-pmp']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Status Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"basic-setup-status\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@id=\"basic-setup-status\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Target Type B2B Button(DFP)': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"basic-setup-target-type-b2b\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"basic-setup-target-type-b2b\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Target Type B2B Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"basic-setup-target-type-b2b-dpm\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"basic-setup-target-type-b2b-dpm\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Target Type B2C Button(DFP)': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"basic-setup-target-type-b2c \"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"basic-setup-target-type-b2c \"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Target Type B2C Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"basic-setup-target-type-b2c-dpm \"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"basic-setup-target-type-b2c-dpm \"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/a_BasicSetupTab': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='order-parent-nav-basic-setup']"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id='order-parent-nav-basic-setup']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/button_BaiscSetupBlendedDealsAutomatic': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='basic-setup-adjustment-automatic']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='basic-setup-adjustment-automatic']" },
      { type: 'CSS', value: "#basic-setup-adjustment-automatic" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/button_BaiscSetupBlendedDealsManual': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='basic-setup-adjustment-manual']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='basic-setup-adjustment-manual']" },
      { type: 'CSS', value: "#basic-setup-adjustment-manual" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/button_BasicSetupBlendedDealsAccordion': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-test-id=\"basic-setup-blended-deals-accordion\"]"
    },
    selectors: [
      { type: 'CSS', value: "#basic-setup-serve-iframe-not" },
      { type: 'XPATH', value: "//div[@data-test-id=\"basic-setup-blended-deals-accordion\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/button_BasicSetupConversionPixelsContinue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='conversion-pixel-modal-continue']"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.addaptive-blue-80.white-text.mr-1.float-left" },
      { type: 'XPATH', value: "//button[@id='conversion-pixel-modal-continue']" },
      { type: 'BASIC', value: "//*[@type = 'button' and (text() = 'Continue' or . = 'Continue')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/button_BasicSetupEditConversionPixel': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[contains(@id, 'basic-setup-conversion-pixel-modal-')]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[contains(@id, 'basic-setup-conversion-pixel-modal-')]" },
      { type: 'BASIC', value: "//*[@type = 'button' and (text() = 'Edit' or . = 'Edit')]" },
      { type: 'CSS', value: "button.modal-edit__btn.btn.btn-primary" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/button_BasicSetupNotesPanelAccordion': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-test-id=\"basic-setup-notes-accordion\"]"
    },
    selectors: [
      { type: 'CSS', value: "h5.accordion-header__title" },
      { type: 'XPATH', value: "//div[@data-test-id=\"basic-setup-notes-accordion\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/button_BasicSetupiFrameCreativesNo': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='basic-setup-serve-iframe-not']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='basic-setup-serve-iframe-not']" },
      { type: 'CSS', value: "#basic-setup-serve-iframe-not" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/button_BasicSetupiFrameCreativesYes': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='basic-setup-serve-iframe-yes']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='basic-setup-serve-iframe-yes']" },
      { type: 'CSS', value: "#basic-setup-serve-iframe-yes" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/button_BlendedDealAdjustmentMethodAutomatic': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='basic-setup-adjustment-automatic']"
    },
    selectors: [
      { type: 'CSS', value: "#basic-setup-adjustment-automatic" },
      { type: 'XPATH', value: "//button[@id='basic-setup-adjustment-automatic']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/button_BlendedDealAdjustmentmethodManual': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='basic-setup-adjustment-manual']"
    },
    selectors: [
      { type: 'CSS', value: "#basic-setup-adjustment-manual" },
      { type: 'XPATH', value: "//button[@id='basic-setup-adjustment-manual']" },
      { type: 'BASIC', value: "//*[@type = 'button' and @id = 'basic-setup-adjustment-manual' and (text() = 'Manual' or . = 'Manual')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/h2_BasicSetup_TabHeader': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Audience'])[1]/following::h2[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Audience'])[1]/following::h2[1]" },
      { type: 'CSS', value: "h2" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/h5_BlendedDealsAccordion': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='basic-setup-blended-deals-accordion']/h5"
    },
    selectors: [
      { type: 'CSS', value: "#basic-setup-blended-deals-accordion > h5.accordion-header__title" },
      { type: 'XPATH', value: "//button[@id='basic-setup-blended-deals-accordion']/h5" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/iframe_creative_button_No': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='basic-setup-serve-iframe-not']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='basic-setup-serve-iframe-not']" },
      { type: 'CSS', value: "#basic-setup-serve-iframe-not" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/iframe_creative_button_Yes': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='basic-setup-serve-iframe-yes']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='basic-setup-serve-iframe-yes']" },
      { type: 'CSS', value: "#basic-setup-serve-iframe-yes" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_AdDaptiveMinGoalImpressions': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='basic-setup-dpm_min_impressions']"
    },
    selectors: [
      { type: 'CSS', value: "#basic-setup-dpm_min_impressions" },
      { type: 'XPATH', value: "//input[@id='basic-setup-dpm_min_impressions']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupAdvertiser': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='basic-setup-advertiser']"
    },
    selectors: [
      { type: 'CSS', value: "#advertiser" },
      { type: 'XPATH', value: "//input[@id='basic-setup-advertiser']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupBlendedDealsAdDaptiveManagedMinGoalImpressions': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='basic-setup-dpm_min_impressions']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='basic-setup-dpm_min_impressions']" },
      { type: 'CSS', value: "#basic-setup-dpm_min_impressions" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupBlendedDealsLinkedOOId': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='basic-setup-linked_o_o_id']"
    },
    selectors: [
      { type: 'CSS', value: "#basic-setup-linked_o_o_id" },
      { type: 'XPATH', value: "//input[@id='basic-setup-linked_o_o_id']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupBlendedDealsOOMinGoalImpressions': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='basic-setup-o_o_impressions']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='basic-setup-o_o_impressions']" },
      { type: 'CSS', value: "#basic-setup-o_o_impressions" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupConversionPixelsSearch': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='conversion-pixel-modal-search']"
    },
    selectors: [
      { type: 'CSS', value: "#search" },
      { type: 'XPATH', value: "//input[@id='conversion-pixel-modal-search']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupLineItemName': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='basic-setup-line-item-name']"
    },
    selectors: [
      { type: 'CSS', value: "#line-item-name" },
      { type: 'XPATH', value: "//input[@id='basic-setup-line-item-name']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupOptionalInsertionOrder': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='basic-setup-optional-insertion-order']"
    },
    selectors: [
      { type: 'CSS', value: "#optional-insertion-order" },
      { type: 'XPATH', value: "//input[@id='basic-setup-optional-insertion-order']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupOrderName': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='basic-setup-order-name']"
    },
    selectors: [
      { type: 'CSS', value: "#order" },
      { type: 'XPATH', value: "//input[@id='basic-setup-order-name']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupSingleObjectDealId': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='basic-setup-single-object-deal-id']"
    },
    selectors: [
      { type: 'CSS', value: "#single-object-deal-id" },
      { type: 'XPATH', value: "//input[@id='basic-setup-single-object-deal-id']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupStatus': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='basic-setup-status']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='basic-setup-status']" },
      { type: 'CSS', value: "div.custom-control.custom-switch" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BlendedDealsDealID': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='basic-setup-linked_o_o_id']"
    },
    selectors: [
      { type: 'CSS', value: "#basic-setup-linked_o_o_id" },
      { type: 'XPATH', value: "//input[@id='basic-setup-linked_o_o_id']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_OOMinGoalImpressions': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='basic-setup-o_o_impressions']"
    },
    selectors: [
      { type: 'CSS', value: "#basic-setup-o_o_impressions" },
      { type: 'XPATH', value: "//input[@id='basic-setup-o_o_impressions']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/label_BasicSetupStatus': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[@for='basic-setup-status']"
    },
    selectors: [
      { type: 'XPATH', value: "//label[@for='basic-setup-status']" },
      { type: 'CSS', value: "div.custom-control.custom-switch" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/select_BasicSetupAdServer': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='basic-setup-ad-server']"
    },
    selectors: [
      { type: 'CSS', value: "select.custom-select.ng-pristine.ng-valid.ng-touched" },
      { type: 'XPATH', value: "//select[@id='basic-setup-ad-server']" },
      { type: 'BASIC', value: "//*[(text() = 'DPM' or . = 'DPM')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/select_BasicSetupCreativeType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='basic-setup-creative-type']"
    },
    selectors: [
      { type: 'CSS', value: "#creative-type" },
      { type: 'XPATH', value: "//select[@id='basic-setup-creative-type']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/select_BasicSetupRevenueType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='basic-setup-revenue-type']"
    },
    selectors: [
      { type: 'CSS', value: "select.custom-select.ng-untouched.ng-pristine.ng-valid" },
      { type: 'XPATH', value: "//select[@id='basic-setup-revenue-type']" },
      { type: 'BASIC', value: "//*[@placeholder = 'Revenue Type' and (text() = 'CPMViewable CPM' or . = 'CPMViewable CPM')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/td_BasicSetupConversionPixelItem': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//td[contains(text(),\"${conversionPixelName}\")]"
    },
    selectors: [
      { type: 'XPATH', value: "//td[contains(text(),\"${conversionPixelName}\")]" },
      { type: 'BASIC', value: "//td[(text() = ' ${conversionPixel} ' or . = ' ${conversionPixel} ')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/textarea_BasicSetupLineItems': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id='basic-setup-line_items_ids']"
    },
    selectors: [
      { type: 'XPATH', value: "//textarea[@id='basic-setup-line_items_ids']" },
      { type: 'CSS', value: "#basic-setup-line_items_ids" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/textarea_BasicSetupNotes': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id='basic-setup-notes']"
    },
    selectors: [
      { type: 'CSS', value: "#notes" },
      { type: 'XPATH', value: "//textarea[@id='basic-setup-notes']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/textarea_Line Items_BlendedDealIDs': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id='basic-setup-line_items_ids']"
    },
    selectors: [
      { type: 'CSS', value: "#basic-setup-line_items_ids" },
      { type: 'XPATH', value: "//textarea[@id='basic-setup-line_items_ids']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/Media Math/Pacing Day Hour Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"impression-day-hour-dropdown\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//select[@id=\"impression-day-hour-dropdown\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/Media Math/Pacing Even Asap Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"impression-even-asap-dropdown\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//select[@id=\"impression-even-asap-dropdown\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/Media Math/Pacing Value Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"budget-flight-impression-pacing-value\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@id=\"budget-flight-impression-pacing-value\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/a_BudgetFlightSwitchToDailyBudget': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[contains(text(),'Switch to Daily Budget')]"
    },
    selectors: [
      { type: 'CSS', value: "div.small-text.text-right > a" },
      { type: 'XPATH', value: "//a[contains(text(),'Switch to Daily Budget')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/a_BudgetFlightSwitchToPacingPercentage': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[contains(text(),'Switch to Pacing Percentage')]"
    },
    selectors: [
      { type: 'CSS', value: "div.small-text.text-right > a" },
      { type: 'XPATH', value: "//a[contains(text(),'Switch to Pacing Percentage')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/a_BudgetFlightTab': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='order-parent-nav-budget-flight']"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id='order-parent-nav-budget-flight']" },
      { type: 'CSS', value: "a.nav-link.active" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/div_BudgetFlightPacingPercentageHandle': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='budget-flight-dragHandle']"
    },
    selectors: [
      { type: 'CSS', value: "#dragHandle" },
      { type: 'XPATH', value: "//div[@id='budget-flight-dragHandle']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/h2_BudgetFlight_PageHeading': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//h2[(text() = 'Budget & Flight' or . = 'Budget & Flight')]"
    },
    selectors: [
      { type: 'CSS', value: "h2.mt-4" },
      { type: 'XPATH', value: "//h2[(text() = 'Budget & Flight' or . = 'Budget & Flight')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_Admin Settings_budget-flight-xandr-life-budget': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='budget-flight-xandr-life-budget']"
    },
    selectors: [
      { type: 'CSS', value: "#budget-flight-xandr-life-budget" },
      { type: 'XPATH', value: "//input[@id='budget-flight-xandr-life-budget']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightCPMValue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='budget-flight-cpm-value-client-facing']"
    },
    selectors: [
      { type: 'CSS', value: "#cpm-value-client-facing" },
      { type: 'XPATH', value: "//input[@id='budget-flight-cpm-value-client-facing']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightDailyBudget': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='budget-flight-daily-budget']"
    },
    selectors: [
      { type: 'CSS', value: "#daily-budget" },
      { type: 'XPATH', value: "//input[@id='budget-flight-daily-budget']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightEndDate': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='input-end']"
    },
    selectors: [
      { type: 'CSS', value: "#input-end" },
      { type: 'XPATH', value: "//input[@id='input-end']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightImpressionGoal': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='budget-flight-impression-goal']"
    },
    selectors: [
      { type: 'CSS', value: "#impression-goal" },
      { type: 'XPATH', value: "//input[@id='budget-flight-impression-goal']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightStartDate': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='input-start']"
    },
    selectors: [
      { type: 'CSS', value: "#input-start" },
      { type: 'XPATH', value: "//input[@id='input-start']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlight_OptimizationCPM': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='budget-flight-cpm-value']"
    },
    selectors: [
      { type: 'CSS', value: "#budget-flight-cpm-value" },
      { type: 'XPATH', value: "//input[@id='budget-flight-cpm-value']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_Xandr Life Budget_budget-flight-xandr-life-buffer': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='budget-flight-xandr-life-buffer']"
    },
    selectors: [
      { type: 'CSS', value: "#budget-flight-xandr-life-buffer" },
      { type: 'XPATH', value: "//input[@id='budget-flight-xandr-life-buffer']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/select_BudgetFlightSubDealId': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='0-subdeal']"
    },
    selectors: [
      { type: 'CSS', value: "#0-subdeal" },
      { type: 'XPATH', value: "//select[@id='0-subdeal']" },
      { type: 'BASIC', value: "//select[@id = '0-subdeal']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/span_BudgetFlightPacingPercentage': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='budget-flight-dragHandle']/span"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='budget-flight-dragHandle']/span" },
      { type: 'CSS', value: "#dragHandle > span" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/span_BudgetFlight_AdminSettings': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id='budget-flight-budget-settings-cog']"
    },
    selectors: [
      { type: 'CSS', value: "#budget-flight-budget-settings-cog" },
      { type: 'XPATH', value: "//span[@id='budget-flight-budget-settings-cog']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/span_Pacing_budget-flight-pacing-settings-cog': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id='budget-flight-pacing-settings-cog']"
    },
    selectors: [
      { type: 'CSS', value: "#budget-flight-pacing-settings-cog" },
      { type: 'XPATH', value: "//span[@id='budget-flight-pacing-settings-cog']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Create an Order Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id=\"get-started-create-order-link\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id=\"get-started-create-order-link\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Create-Order/a_Create Order': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[contains(text(),'Create Order')]"
    },
    selectors: [
      { type: 'CSS', value: "a.btn.btn-primary-80.text-white.btn-shadow.mx-2" },
      { type: 'XPATH', value: "//a[contains(text(),'Create Order')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Create-Order/h1_CreateOrderPageName': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='${urlAdDaptiveBackend}'])[1]/following::h1[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='${urlAdDaptiveBackend}'])[1]/following::h1[1]" },
      { type: 'CSS', value: "h1.flex-grow-1" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Actions/Archive Creative Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[@id='creative-${creativeIndex}']//button[@id='creative-base-archive']"
    },
    selectors: [
      { type: 'CSS', value: "#creative-base-archive" },
      { type: 'XPATH', value: "//article[@id='creative-${creativeIndex}']//button[@id='creative-base-archive']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Actions/Delete Creative Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[@id='creative-${creativeIndex}']//button[@id = 'creative-base-delete']"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.addaptive-blue-80.float-right.px-4.mr-3.ng-tns-c154-65" },
      { type: 'XPATH', value: "//article[@id='creative-${creativeIndex}']//button[@id = 'creative-base-delete']" },
      { type: 'BASIC', value: "//*[@type = 'button' and (text() = 'Save' or . = 'Save')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Actions/New Creative Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[text() = 'New Creative' or . = 'New Creative']"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-icon.btn-primary" },
      { type: 'XPATH', value: "//button[text() = 'New Creative' or . = 'New Creative']" },
      { type: 'BASIC', value: "//*[@type = 'button' and (text() = 'New Creative' or . = 'New Creative')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Audio/Audio Upload': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//app-audio)[${creativeIndex}]//app-file-selector[@name=\"Audio Upload\"]//input"
    },
    selectors: [
      { type: 'CSS', value: "div.form-group.m-0.d-flex.flex-column.w-100.position-relative" },
      { type: 'XPATH', value: "(//app-audio)[${creativeIndex}]//app-file-selector[@name=\"Audio Upload\"]//input" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Audio/Audio Verification URL Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@data-test-id=\"creative-audio-landing-url-${creativeIndex}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@data-test-id=\"creative-audio-landing-url-${creativeIndex}\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Audio/Third Party URL Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//app-audio)[${creativeIndex}]//input[@id=\"pixel-url\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//app-audio)[${creativeIndex}]//input[@id=\"pixel-url\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Banner/Creatives HTML Textarea': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[@id='creative-${creativeIndex}']//textarea[contains(@id, 'creative-html')]"
    },
    selectors: [
      { type: 'CSS', value: "#creative-html-iframe" },
      { type: 'XPATH', value: "//article[@id='creative-${creativeIndex}']//textarea[contains(@id, 'creative-html')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Banner/HTML5 Upload': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//app-banner)[${creativeIndex}]//app-file-selector[@name=\"HTML5 Upload\"]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//app-banner)[${creativeIndex}]//app-file-selector[@name=\"HTML5 Upload\"]//input" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Banner/Image Upload': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//app-banner)[${creativeIndex}]//app-file-selector[@name=\"Image Upload\"]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//app-banner)[${creativeIndex}]//app-file-selector[@name=\"Image Upload\"]//input" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Banner/Landing Page Url Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@data-test-id=\"creative-banner-landing-url-${creativeIndex}\"]"
    },
    selectors: [
      { type: 'CSS', value: "#creative-landing-url" },
      { type: 'XPATH', value: "//input[@data-test-id=\"creative-banner-landing-url-${creativeIndex}\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import Choose File Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"bulk-import-file-button\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//button[@id=\"bulk-import-file-button\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import Continue Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"bulk-import-continue\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//button[@id=\"bulk-import-continue\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[contains(@class, 'options-dropdown')]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//span[contains(@class, 'options-dropdown')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import First Image For All Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"bulk-import-image-use-1st-url-for-all\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"bulk-import-image-use-1st-url-for-all\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import First URL For All Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"bulk-import-image-use-1st-url-for-all\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"bulk-import-image-use-1st-url-for-all\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import Image Click Target URL': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"bulk-import-click-target-url-${index}-${name}\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@id=\"bulk-import-click-target-url-${index}-${name}\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import Image Protocol': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"bulk-protocol-${index}\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//select[@id=\"bulk-protocol-${index}\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import Menu Span': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//ngb-popover-window/div[2]/div/span"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//ngb-popover-window/div[2]/div/span" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import Native First Image For All Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"bulk-import-csv-native-use-1st-image-for-all\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"bulk-import-csv-native-use-1st-image-for-all\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import Size Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"bulk-html-size-${index}\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//select[@id=\"bulk-html-size-${index}\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import Type Radio': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"${type}Radio\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@id=\"${type}Radio\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/File Upload': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@type=\"file\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@type=\"file\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Native 1st Icon For All Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"bulk-import-csv-native-use-1st-icon-for-all\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"bulk-import-csv-native-use-1st-icon-for-all\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Native Creative Icon Upload Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-generic-file-selector[@id=\"bulk-import-csv-native-icon-upload-${index}\"]//input"
    },
    selectors: [
      { type: 'XPATH', value: "//app-generic-file-selector[@id=\"bulk-import-csv-native-icon-upload-${index}\"]//input" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Native Creative Image Upload Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-generic-file-selector[@id=\"bulk-import-csv-native-image-upload-${index}\"]//input"
    },
    selectors: [
      { type: 'XPATH', value: "//app-generic-file-selector[@id=\"bulk-import-csv-native-image-upload-${index}\"]//input" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Creative Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[@id='creative-${creativeIndex}']//input[contains(@id, 'creative-name')]"
    },
    selectors: [
      { type: 'CSS', value: "#creative-name" },
      { type: 'XPATH', value: "//article[@id='creative-${creativeIndex}']//input[contains(@id, 'creative-name')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Creative Size Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[@id='creative-${creativeIndex}']//select[contains(@id, 'creative-size')]"
    },
    selectors: [
      { type: 'CSS', value: "#creative-size" },
      { type: 'XPATH', value: "//article[@id='creative-${creativeIndex}']//select[contains(@id, 'creative-size')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Creative Tag ID Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[@id='creative-${creativeIndex}']//input[@formcontrolname=\"creativeTagId\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//article[@id='creative-${creativeIndex}']//input[@formcontrolname=\"creativeTagId\"]" },
      { type: 'CSS', value: "div.form-group.mb-0.mt-2.ng-tns-c154-65.ng-star-inserted > #creative-landing-url" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Creative Type Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-${type}[${creativeIndex}]//select[contains(@id, 'creative-type')]"
    },
    selectors: [
      { type: 'XPATH', value: "//app-${type}[${creativeIndex}]//select[contains(@id, 'creative-type')]" },
      { type: 'CSS', value: "#creative-type" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Creatives Tab Link': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='order-parent-nav-creatives']"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id='order-parent-nav-creatives']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/HTML5 Upload Span': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-file-selector[@id=\"creative-banner-html5-upload\"]//span[contains(@class, 'file-uploaded')]"
    },
    selectors: [
      { type: 'XPATH', value: "//app-file-selector[@id=\"creative-banner-html5-upload\"]//span[contains(@class, 'file-uploaded')]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Landing Page URL Input(Native)': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@data-test-id=\"creative-native-landing-url-${creativeIndex}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@data-test-id=\"creative-native-landing-url-${creativeIndex}\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Native Icon Upload Span': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-file-selector[@id=\"creative-native-icon-upload\"]//span[contains(@class, 'file-uploaded')]"
    },
    selectors: [
      { type: 'XPATH', value: "//app-file-selector[@id=\"creative-native-icon-upload\"]//span[contains(@class, 'file-uploaded')]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Native Image Upload Span': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-file-selector[@id=\"creative-native-icon-upload\"]//span[contains(@class, 'file-uploaded')]"
    },
    selectors: [
      { type: 'XPATH', value: "//app-file-selector[@id=\"creative-native-icon-upload\"]//span[contains(@class, 'file-uploaded')]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Native/Body Textarea': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[@id='creative-${creativeIndex}']//textarea[contains(@id, 'creative-body-text')]"
    },
    selectors: [
      { type: 'CSS', value: "#creative-body-text" },
      { type: 'XPATH', value: "//article[@id='creative-${creativeIndex}']//textarea[contains(@id, 'creative-body-text')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Native/Call to Action Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[@id='creative-${creativeIndex}']//input[contains(@id, 'creative-call-to-action')]"
    },
    selectors: [
      { type: 'CSS', value: "#creative-call-to-action" },
      { type: 'XPATH', value: "//article[@id='creative-${creativeIndex}']//input[contains(@id, 'creative-call-to-action')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Native/Icon Upload': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//app-native)[${creativeIndex}]//app-file-selector[@name=\"Icon Upload\"]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//app-native)[${creativeIndex}]//app-file-selector[@name=\"Icon Upload\"]//input" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Native/Image Upload': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//app-native)[${creativeIndex}]//app-file-selector[@name=\"Image Upload\"]//input"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "(//app-native)[${creativeIndex}]//app-file-selector[@name=\"Image Upload\"]//input" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Native/Landing Page Url Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@data-test-id=\"creative-native-landing-url-${creativeIndex}\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@data-test-id=\"creative-native-landing-url-${creativeIndex}\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Native/Sponsered By Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[contains(@id, 'creative-sponsored-by')]"
    },
    selectors: [
      { type: 'CSS', value: "#creative-sponsored-by" },
      { type: 'XPATH', value: "//input[contains(@id, 'creative-sponsored-by')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Native/Title Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[@id='creative-${creativeIndex}']//input[contains(@id, 'creative-title')]"
    },
    selectors: [
      { type: 'CSS', value: "#creative-title" },
      { type: 'XPATH', value: "//article[@id='creative-${creativeIndex}']//input[contains(@id, 'creative-title')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Protocol Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[@id='creative-${creativeIndex}']//select[contains(@id, 'protocol')]"
    },
    selectors: [
      { type: 'CSS', value: "#creative-protocol" },
      { type: 'XPATH', value: "//article[@id='creative-${creativeIndex}']//select[contains(@id, 'protocol')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Save Creative Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[@id='creative-${creativeIndex}']//button[@type='button' and (text() = 'Save' or . = 'Save')]"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.addaptive-blue-80.float-right.px-4.mr-3.ng-tns-c154-65" },
      { type: 'XPATH', value: "//article[@id='creative-${creativeIndex}']//button[@type='button' and (text() = 'Save' or . = 'Save')]" },
      { type: 'BASIC', value: "//*[@type = 'button' and (text() = 'Save' or . = 'Save')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Splits Nav Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='creatives-splits-link']"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id='creatives-splits-link']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/Action Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"third-party-pixel-${pixelCount}-action-select\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id=\"third-party-pixel-${pixelCount}-action-select\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/Add Third Party Pixel Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[@id='creative-${creativeIndex}']//app-pixel/div"
    },
    selectors: [
      { type: 'CSS', value: "div.pixel-container.py-2.pl-4.d-flex.flex-column.ng-tns-c254-68" },
      { type: 'XPATH', value: "//article[@id='creative-${creativeIndex}']//app-pixel/div" },
      { type: 'BASIC', value: "//div[(text() = ' Third Party Pixels Optional' or . = ' Third Party Pixels Optional')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/Continue Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"third-party-modal-continue\"]"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-primary.mr-1.float-left" },
      { type: 'XPATH', value: "//button[@id=\"third-party-modal-continue\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/Creative Pixels Action Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"third-party-pixel-${pixelCount}-action-select\"]"
    },
    selectors: [
      { type: 'CSS', value: "#pixel-action" },
      { type: 'XPATH', value: "//select[@id=\"third-party-pixel-${pixelCount}-action-select\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/Delete Pixel Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//app-third-party-pixel//app-third-party-pixel/div/span)[${pixelCount}]"
    },
    selectors: [
      { type: 'CSS', value: "span.ad-icon-x.ad-icon-danger-s1.ad-icon-small.close-icon.ng-tns-c215-10" },
      { type: 'XPATH', value: "(//app-third-party-pixel//app-third-party-pixel/div/span)[${pixelCount}]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/button_CreativesNewPixel': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@type='button' and (text() = 'New Pixel' or . = 'New Pixel')]"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-primary.float-right" },
      { type: 'XPATH', value: "//button[@type='button' and (text() = 'New Pixel' or . = 'New Pixel')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/input_CreativesPixelActionTypeClick': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"${pixelCount}action-1\"]"
    },
    selectors: [
      { type: 'CSS', value: "#0action-1" },
      { type: 'XPATH', value: "//input[@id=\"${pixelCount}action-1\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/input_CreativesPixelActionTypeImpression': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"${pixelCount}action-0\"]"
    },
    selectors: [
      { type: 'CSS', value: "#0action-0" },
      { type: 'XPATH', value: "//input[@id=\"${pixelCount}action-0\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/input_CreativesPixelTypeImage': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"${pixelCount}type2\"]"
    },
    selectors: [
      { type: 'CSS', value: "#0type2" },
      { type: 'XPATH', value: "//input[@id=\"${pixelCount}type2\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/input_CreativesPixelTypeJavaScript': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"${pixelCount}type1\"]"
    },
    selectors: [
      { type: 'CSS', value: "#0type1" },
      { type: 'XPATH', value: "//input[@id=\"${pixelCount}type1\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/input_CreativesPixelURL': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"third-party-pixel-url-${pixelCount}\"]"
    },
    selectors: [
      { type: 'CSS', value: "#pixel-url" },
      { type: 'XPATH', value: "//input[@id=\"third-party-pixel-url-${pixelCount}\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Video Upload Span': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-file-selector[@customid=\"creative-video-upload\"]//span[contains(@class, 'file-uploaded')]"
    },
    selectors: [
      { type: 'XPATH', value: "//app-file-selector[@customid=\"creative-video-upload\"]//span[contains(@class, 'file-uploaded')]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Video/Landing Page Url Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@data-test-id=\"creative-video-landing-url-${creativeIndex}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@data-test-id=\"creative-video-landing-url-${creativeIndex}\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/Video/Video Upload': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//app-video)[${creativeIndex}]//app-file-selector[@name=\"Video Upload\"]//input"
    },
    selectors: [
      { type: 'CSS', value: "div.form-group.m-0.d-flex.flex-column.w-100.position-relative" },
      { type: 'XPATH', value: "(//app-video)[${creativeIndex}]//app-file-selector[@name=\"Video Upload\"]//input" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/article_CreativesContainer': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[@id='creative-${creativeIndex}']"
    },
    selectors: [
      { type: 'CSS', value: "div.creative-container.position-relative.ng-tns-c154-65" },
      { type: 'XPATH', value: "//article[@id='creative-${creativeIndex}']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Creatives-Tab/input_CreativesThirdPartyURL': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[@id='creative-${creativeIndex}']//input[contains(@id, 'pixel-url')]"
    },
    selectors: [
      { type: 'CSS', value: "#pixel-url" },
      { type: 'XPATH', value: "//article[@id='creative-${creativeIndex}']//input[contains(@id, 'pixel-url')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Delete Order Anchor': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id=\"orders-list-item-delete-icon-border-${index}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id=\"orders-list-item-delete-icon-border-${index}\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Duplicate Order Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"objectives-duplicate-order\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"objectives-duplicate-order\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Get Order By Id': {
    kind: 'api',
    method: 'GET',
    url: "${url}/ng-api/v2/order/${orderId}"
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Brand Safety Row': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-brand-safety-modal//span[text()=\"${brandSafety}\"]/ancestor::tr"
    },
    selectors: [
      { type: 'XPATH', value: "//app-brand-safety-modal//span[text()=\"${brandSafety}\"]/ancestor::tr" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Browser Targeting Row': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-system-targeting-modal//span[text()=\"${targetingItemBrowser}\"]/ancestor::tr"
    },
    selectors: [
      { type: 'XPATH', value: "//app-system-targeting-modal//span[text()=\"${targetingItemBrowser}\"]/ancestor::tr" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/CrossDeviceActivation_dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='inventory-cross-device-graph-provider']"
    },
    selectors: [
      { type: 'CSS', value: "div.popup-body.p-3" },
      { type: 'XPATH', value: "//select[@id='inventory-cross-device-graph-provider']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Day Parting Day Label': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[contains(@class, 'day-label')]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//div[contains(@class, 'day-label')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Frequency Cap Checkbox Label': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"frequency-cap\"]//following-sibling::label"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"frequency-cap\"]//following-sibling::label" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Frequency Cap Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"frequency-cap\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"frequency-cap\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Browser Targeting/button_InventoryBrowserTargetingContinue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='system-targeting-modal-continue']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='system-targeting-modal-continue']" },
      { type: 'CSS', value: "button.btn.btn-primary.mr-1.float-left" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Browser Targeting/button_InventoryBrowserTargetingEdit': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='inventory-browser-targeting-modal']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='inventory-browser-targeting-modal']" },
      { type: 'CSS', value: "button.modal-edit__btn.btn.btn-primary.btn-primary-80" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Browser Targeting/button_InventoryBrowserTargetingExclude': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='system-targeting-modal-list-exclude']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='system-targeting-modal-list-exclude']" },
      { type: 'CSS', value: "button.btn.btn-sm.btn-danger" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Browser Targeting/button_InventoryBrowserTargetingInclude': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='system-targeting-modal-list-include']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='system-targeting-modal-list-include']" },
      { type: 'CSS', value: "button.btn.btn-sm.btn-outline-secondary" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Deal Targeting/button_InventoryDealTargetingContinue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='deals-list-modal-continue']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='deals-list-modal-continue']" },
      { type: 'CSS', value: "button.btn.btn-primary.mr-1.float-left" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Deal Targeting/button_InventoryDealTargetingEdit': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='inventory-deals-targeting-modal']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='inventory-deals-targeting-modal']" },
      { type: 'CSS', value: "div.deals-container.ng-star-inserted > div.modal-edit.ng-star-inserted > button.modal-edit__btn.btn.btn-primary.btn-primary-80" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Deal Targeting/span_InventoryDealTargetingExclude': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id='deals-list-modal-exclude']"
    },
    selectors: [
      { type: 'XPATH', value: "//span[@id='deals-list-modal-exclude']" },
      { type: 'CSS', value: "span.pill-item.right.px-2.py-1" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Deal Targeting/span_InventoryDealTargetingInclude': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id='deals-list-modal-include']"
    },
    selectors: [
      { type: 'XPATH', value: "//span[@id='deals-list-modal-include']" },
      { type: 'CSS', value: "span.pill-item.left.px-2.py-1.selected" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Deal Targeting/span_InventoryDealTargetingItem': {
    kind: 'web',
    selectorMethod: 'BASIC',
    preferred: {
      type: 'BASIC',
      value: "//span[(text() = '${dealTargetingItem}' or . = '${dealTargetingItem}')]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Exclude'])[1]/following::span[1]" },
      { type: 'BASIC', value: "//span[(text() = '${dealTargetingItem}' or . = '${dealTargetingItem}')]" },
      { type: 'CSS', value: "td.d-inline-flex.align-items-center.column-height.flex-grow-1 > div.d-flex.flex-column > span" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Devices/div_InventoryDeviceAudio': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='inventory-device-Audio']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='inventory-device-Audio']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Devices/div_InventoryDeviceAudioSelected': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='inventory-device-Audio']//div[@class='selected-badge']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='inventory-device-Audio']//div[@class='selected-badge']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Devices/div_InventoryDeviceCTV': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='inventory-device-CTV']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='inventory-device-CTV']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Devices/div_InventoryDeviceCTVSelected': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='inventory-device-CTV']//div[@class='selected-badge']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='inventory-device-CTV']//div[@class='selected-badge']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Devices/div_InventoryDeviceDesktop': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='inventory-device-Desktop']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='inventory-device-Desktop']" },
      { type: 'CSS', value: "div.device-container.d-flex.justify-content-center.align-items-center.py-2.selected-device" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Devices/div_InventoryDeviceDesktopSelected': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='inventory-device-Desktop']//div[@class='selected-badge']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='inventory-device-Desktop']//div[@class='selected-badge']" },
      { type: 'CSS', value: "span.ad-icon-settings.ad-icon-primary-s2" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Devices/div_InventoryDeviceMobile': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='inventory-device-Mobile']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='inventory-device-Mobile']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Devices/div_InventoryDeviceMobileSelected': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='inventory-device-Mobile']//div[@class='selected-badge']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='inventory-device-Mobile']//div[@class='selected-badge']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Devices/div_InventoryDeviceTablet': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='inventory-device-Tablet']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='inventory-device-Tablet']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Devices/div_InventoryDeviceTabletSelected': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='inventory-device-Tablet']//div[@class='selected-badge']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='inventory-device-Tablet']//div[@class='selected-badge']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory List Row': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//ngb-modal-window//span[text()=\"${inventoryList}\"]/ancestor::tr"
    },
    selectors: [
      { type: 'XPATH', value: "//ngb-modal-window//span[text()=\"${inventoryList}\"]/ancestor::tr" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Seller/Seller Targeting Row': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-sellers-targeting-modal//span[text()=\"${sellerTargeting}\"]/ancestor::tr"
    },
    selectors: [
      { type: 'XPATH', value: "//app-sellers-targeting-modal//span[text()=\"${sellerTargeting}\"]/ancestor::tr" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Seller/button_InventorySellerTargetingContinue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='sellers-modal-continue']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='sellers-modal-continue']" },
      { type: 'CSS', value: "button.btn.btn-primary.mr-1.float-left" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Seller/button_InventorySellerTargetingEdit': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='inventory-sellers-targeting-modal']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='inventory-sellers-targeting-modal']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Seller/button_InventorySellerTargetingExclude': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='sellers-modal-list-exclude']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='sellers-modal-list-exclude']" },
      { type: 'CSS', value: "button.btn.btn-sm.btn-danger" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Seller/button_InventorySellerTargetingInclude': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='sellers-modal-list-include']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='sellers-modal-list-include']" },
      { type: 'CSS', value: "button.btn.btn-sm.btn-outline-secondary" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Seller/span_InventorySellerTargetingItem': {
    kind: 'web',
    selectorMethod: 'BASIC',
    preferred: {
      type: 'BASIC',
      value: "//span[(text() = '${sellerTargetingItem}' or . = '${sellerTargetingItem}')]"
    },
    selectors: [
      { type: 'XPATH', value: "//*/text()[normalize-space(.)='CtrlShift Singapore Pte Ltd']/parent::*" },
      { type: 'BASIC', value: "//span[(text() = '${sellerTargetingItem}' or . = '${sellerTargetingItem}')]" },
      { type: 'CSS', value: "div.d-flex.flex-column.justify-content-center.align-content-center.max-height-40 > span" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Media Math/Post Bid Measurement Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"post-bid-measurement-viewability\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@id=\"post-bid-measurement-viewability\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Recency Cap Checkbox Label': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"recency-capRecency\"]//following-sibling::label"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"recency-capRecency\"]//following-sibling::label" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Recency Cap Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"recency-capRecency\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"recency-capRecency\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/Selected Profile Span': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//strong[text()=\"Selected Profile:\"]//ancestor-sibling::span"
    },
    selectors: [
      { type: 'XPATH', value: "//strong[text()=\"Selected Profile:\"]//ancestor-sibling::span" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/a_InventoryDayParting_DeleteIcon': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='daySplitter']/div/app-day-splitting/dts-select-container/table/tr[contains(.,'${dayOfWeek}')]//li[@class='list-inline-item delete-wrapper']/a[@class='delete-icon']"
    },
    selectors: [
      { type: 'CSS', value: "div.dts-select-item.drag-selected.hour-cell" },
      { type: 'XPATH', value: "//div[@id='daySplitter']/div/app-day-splitting/dts-select-container/table/tr[contains(.,'${dayOfWeek}')]//li[@class='list-inline-item delete-wrapper']/a[@class='delete-icon']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/a_InventoryGeoProfileNameSave': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='inventory-save-geo-profile-create-edit']"
    },
    selectors: [
      { type: 'CSS', value: "a.geo-save-btn.mr-2" },
      { type: 'XPATH', value: "//a[@id='inventory-save-geo-profile-create-edit']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/a_InventoryTab': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='order-parent-nav-inventory']"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id='order-parent-nav-inventory']" },
      { type: 'CSS', value: "a.nav-link.active" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/a_InventoryTargetingAdminGear': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='inventory-targeting-settings-cog']"
    },
    selectors: [
      { type: 'CSS', value: "span.icon.ad-icon-settings.ng-star-inserted" },
      { type: 'XPATH', value: "//a[@id='inventory-targeting-settings-cog']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventoryBrandSafetyTargetingContinue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='brand-safety-modal-save']"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-primary.mr-1.float-left" },
      { type: 'XPATH', value: "//button[@id='brand-safety-modal-save']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventoryBrandSaftyTargetingEdit': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[contains(@class, 'modal-edit-label') and ./label[normalize-space()='Brand Safety Targeting']]//following-sibling::button"
    },
    selectors: [
      { type: 'XPATH', value: "//div[contains(@class, 'modal-edit-label') and ./label[normalize-space()='Brand Safety Targeting']]//following-sibling::button" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventoryDayPartingAccordion': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-test-id=\"inventory-day-parting-accordion\"]"
    },
    selectors: [
      { type: 'CSS', value: "span.ad-icon-add.ad-icon-small.ad-icon-primary-s2.ng-star-inserted" },
      { type: 'XPATH', value: "//div[@data-test-id=\"inventory-day-parting-accordion\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventoryDeleteProfile': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='inventory-delete-geo-profile']"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-danger" },
      { type: 'XPATH', value: "//button[@id='inventory-delete-geo-profile']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventoryFrequencyAndRecencyAccordion': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-test-id=\"inventory-frequency-recency-accordion\"]"
    },
    selectors: [
      { type: 'CSS', value: "#frequency-header > button.accordion-header.ng-star-inserted.collapsed > div.accordion-header__btn > span.ad-icon-add.ad-icon-small.ad-icon-primary-s2.ng-star-inserted" },
      { type: 'XPATH', value: "//div[@data-test-id=\"inventory-frequency-recency-accordion\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventoryGeoTargetingSearchListItem': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[contains(@id,'ngb-typeahead')]/*[text() = '${searchText}']/span[text() = '${searchTextHighlighted}']"
    },
    selectors: [
      { type: 'CSS', value: "#ngb-typeahead-0-0" },
      { type: 'XPATH', value: "//button[contains(@id,'ngb-typeahead')]/*[text() = '${searchText}']/span[text() = '${searchTextHighlighted}']" },
      { type: 'BASIC', value: "//*[@type = 'button' and @id = 'ngb-typeahead-0-0' and (text() = '${searchText}' or . = '${searchText}')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventoryInventoryListTargetingContinue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='inventory-list-modal-continue']"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-primary.mr-1.float-left" },
      { type: 'XPATH', value: "//button[@id='inventory-list-modal-continue']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventoryInventoryListTargetingEdit': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='inventory-inventory-list-targeting-modal']"
    },
    selectors: [
      { type: 'CSS', value: "div.modal-edit.ng-star-inserted > button.modal-edit__btn.btn.btn-primary.btn-primary-80" },
      { type: 'XPATH', value: "//button[@id='inventory-inventory-list-targeting-modal']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventorySaveProfile': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[(text() = 'Save Profile' or . = 'Save Profile')]"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-primary" },
      { type: 'XPATH', value: "//button[(text() = 'Save Profile' or . = 'Save Profile')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/crossDevice_Off': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='inventory-settings-cross-device-on']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='inventory-settings-cross-device-on']" },
      { type: 'CSS', value: "#inventory-settings-cross-device-on" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/crossDevice_On': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='inventory-settings-cross-device-off']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='inventory-settings-cross-device-off']" },
      { type: 'CSS', value: "#inventory-settings-cross-device-off" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/div_InventoryDayPartingDaySpliter': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-day-splitting/dts-select-container/table/tr[${dayOfWeek}]/td[${hour}]/div"
    },
    selectors: [
      { type: 'CSS', value: "div.dts-select-item.drag-selected.hour-cell" },
      { type: 'XPATH', value: "//app-day-splitting/dts-select-container/table/tr[${dayOfWeek}]/td[${hour}]/div" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/div_InventoryGeoTargetingItem': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[contains(@id, 'inventory-geotargeting-item')]//span[(text() = '${searchText}' or . = '${searchText}')]"
    },
    selectors: [
      { type: 'CSS', value: "div.tag-container__item.badge.badge-pill.aquamarine-80.small-text.white-text.pointer.p-2.ng-star-inserted" },
      { type: 'XPATH', value: "//div[contains(@id, 'inventory-geotargeting-item')]//span[(text() = '${searchText}' or . = '${searchText}')]" },
      { type: 'BASIC', value: "//*[(text() = '${searchText}' or . = '${searchText}')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/div_InventoryTargetingAdminAllDeals': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='inventory-settings-all-deals']"
    },
    selectors: [
      { type: 'CSS', value: "div.pill-item" },
      { type: 'XPATH', value: "//div[@id='inventory-settings-all-deals']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/div_InventoryTargetingAdminSpecificDeals': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='inventory-settings-specific-deals']"
    },
    selectors: [
      { type: 'CSS', value: "div.pill-item.selected" },
      { type: 'XPATH', value: "//div[@id='inventory-settings-specific-deals']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/h2_Inventory_PageHeading': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//h2[(text() = 'Inventory' or . = 'Inventory')]"
    },
    selectors: [
      { type: 'CSS', value: "h2.mt-4" },
      { type: 'XPATH', value: "//h2[(text() = 'Inventory' or . = 'Inventory')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryBrandSafetyTargetingSearch': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='brand-safety-modal-cpm-value']"
    },
    selectors: [
      { type: 'CSS', value: "#cpm-value" },
      { type: 'XPATH', value: "//input[@id='brand-safety-modal-cpm-value']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryCompletionRateThresholdPredictedVideoCompletion': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='completion-threshold']"
    },
    selectors: [
      { type: 'CSS', value: "input.form-control.inputContainer.mx-2.ng-untouched.ng-pristine.ng-valid" },
      { type: 'XPATH', value: "//input[@id='completion-threshold']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryDealTargetingSearch': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='deals-list-modal-search']"
    },
    selectors: [
      { type: 'CSS', value: "#cpm-value" },
      { type: 'XPATH', value: "//input[@id='deals-list-modal-search']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryFrequencyImpression': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='frequency-impressions']"
    },
    selectors: [
      { type: 'CSS', value: "input.inputContainer.mr-3.ml-4.form-control.ng-touched.ng-pristine.ng-valid" },
      { type: 'XPATH', value: "//input[@id='frequency-impressions']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryGeoProfileName': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='inventory-geo-profileName']"
    },
    selectors: [
      { type: 'CSS', value: "#profileName" },
      { type: 'XPATH', value: "//input[@id='inventory-geo-profileName']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryGeoTargetingTargetSearch': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='inventory-geoTargetSearch']"
    },
    selectors: [
      { type: 'CSS', value: "#geoTargetSearch" },
      { type: 'XPATH', value: "//input[@id='inventory-geoTargetSearch']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryInventoryListTargetingSearch': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='inventory-list-modal-search']"
    },
    selectors: [
      { type: 'CSS', value: "#search" },
      { type: 'XPATH', value: "//input[@id='inventory-list-modal-search']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryListenthroughThresholdPredictedListenthroughThreshold': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='listen-through']"
    },
    selectors: [
      { type: 'CSS', value: "#listen-through" },
      { type: 'XPATH', value: "//input[@id='listen-through']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryRecencyImpression': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='recency-recency-impression']"
    },
    selectors: [
      { type: 'CSS', value: "input.inputContainer.form-control.ng-untouched.ng-pristine.ng-valid" },
      { type: 'XPATH', value: "//input[@id='recency-recency-impression']" },
      { type: 'BASIC', value: "//*[@type = 'text' and @placeholder = '0']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventorySellerTargetingSearch': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='search']"
    },
    selectors: [
      { type: 'CSS', value: "#search" },
      { type: 'XPATH', value: "//input[@id='search']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventorySettingsSupplyStrategyBoth': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='order-inventory-has-both']"
    },
    selectors: [
      { type: 'CSS', value: "#order-inventory-has-both" },
      { type: 'XPATH', value: "//input[@id='order-inventory-has-both']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventorySettingsSupplyStrategyDeals': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='order-inventory-has-deals']"
    },
    selectors: [
      { type: 'CSS', value: "#order-inventory-has-deals" },
      { type: 'XPATH', value: "//input[@id='order-inventory-has-deals']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventorySettingsSupplyStrategyOpenExchange': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='inventory-settings-open-exchange']"
    },
    selectors: [
      { type: 'CSS', value: "#inventory-settings-open-exchange" },
      { type: 'XPATH', value: "//input[@id='inventory-settings-open-exchange']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryTargetingAdminDeals': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id = 'inventory-settings-deals']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id = 'inventory-settings-deals']" },
      { type: 'BASIC', value: "//input[@id = 'deals']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryTargetingAdminOpenExchange': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='inventory-settings-open-exchange']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='inventory-settings-open-exchange']" },
      { type: 'BASIC', value: "//input[@id = 'open-exchange']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryViewabilityThresholdPredictedViewability': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='viewability']"
    },
    selectors: [
      { type: 'CSS', value: "#viewability" },
      { type: 'XPATH', value: "//input[@id='viewability']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryBrandSafetyTargetingSupplier': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='brand-safety-modal-suplier']"
    },
    selectors: [
      { type: 'CSS', value: "#brand-safety-type" },
      { type: 'XPATH', value: "//select[@id='brand-safety-modal-suplier']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryDealTargetingDealType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='deals-list-modal-deal-type']"
    },
    selectors: [
      { type: 'CSS', value: "#brand-safety-type" },
      { type: 'XPATH', value: "//select[@id='deals-list-modal-deal-type']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryDeviceType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='inventory-inventory-type']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='inventory-inventory-type']" },
      { type: 'CSS', value: "div.form-group > div.custom-select-parent > select.custom-select.ng-untouched.ng-pristine.ng-valid" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryFrequencyList': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='frequency-list']"
    },
    selectors: [
      { type: 'CSS', value: "select.custom-select.ng-touched.ng-pristine.ng-valid" },
      { type: 'XPATH', value: "//select[@id='frequency-list']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryGeoTargetingProfile': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='inventory-geo-targeting-profile']"
    },
    selectors: [
      { type: 'CSS', value: "#inventory-geo-targeting-profile" },
      { type: 'XPATH', value: "//select[@id='inventory-geo-targeting-profile']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryGeoTargetingType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='inventory-geo-targeting-type']"
    },
    selectors: [
      { type: 'CSS', value: "select.custom-select.ng-pristine.ng-valid.ng-touched" },
      { type: 'XPATH', value: "//select[@id='inventory-geo-targeting-type']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryInventoryListTargetingType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='inventory-list-modal-type']"
    },
    selectors: [
      { type: 'CSS', value: "#type" },
      { type: 'XPATH', value: "//select[@id='inventory-list-modal-type']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryRecencyList': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='recency-recency-list']"
    },
    selectors: [
      { type: 'CSS', value: "div.sand-40.recencyContiner.ng-star-inserted > div.row > div.form-group.ml-3 > div.selectContainer > select.custom-select.ng-touched.ng-pristine.ng-valid" },
      { type: 'XPATH', value: "//select[@id='recency-recency-list']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/span_InventoryBrandSafetyTargetingItem': {
    kind: 'web',
    selectorMethod: 'BASIC',
    preferred: {
      type: 'BASIC',
      value: "//span[(text() = '${brandSafetyItem}' or . = '${brandSafetyItem}')]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Include'])[3]/following::span[1]" },
      { type: 'BASIC', value: "//span[(text() = '${brandSafetyItem}' or . = '${brandSafetyItem}')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/span_InventoryBrowserTargetingItem': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text())='Include'])[1]/following::span[normalize-space(text())='${targetingItemBrowser}']"
    },
    selectors: [
      { type: 'BASIC', value: "//span[(text() = '${targetingItemBrowser}' or . = '${targetingItemBrowser}')]" },
      { type: 'CSS', value: "div.d-flex.flex-column.justify-content-center.align-content-center.max-height-25 > span" },
      { type: 'XPATH', value: "(.//*[normalize-space(text())='Include'])[1]/following::span[normalize-space(text())='${targetingItemBrowser}']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/span_InventoryInventoryListTargetingItem': {
    kind: 'web',
    selectorMethod: 'BASIC',
    preferred: {
      type: 'BASIC',
      value: "//span[(text() = '${inventoryListItem}' or . = '${inventoryListItem}')]"
    },
    selectors: [
      { type: 'CSS', value: "div.d-flex.flex-column.justify-content-center.align-content-center.max-height-25 > span" },
      { type: 'XPATH', value: "//*/text()[normalize-space(.)='Blacklist Test 1']/parent::*" },
      { type: 'BASIC', value: "//span[(text() = '${inventoryListItem}' or . = '${inventoryListItem}')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Inventory-Tab/textarea_InventoryGeoTargetingZipCode': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id='inventory-zips']"
    },
    selectors: [
      { type: 'CSS', value: "#inventory-zips" },
      { type: 'XPATH', value: "//textarea[@id='inventory-zips']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Line Item Payload': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//h2[text() = 'LineItem Payload' or . = 'LineItem Payload']/following-sibling::pre"
    },
    selectors: [
      { type: 'XPATH', value: "//h2[text() = 'LineItem Payload' or . = 'LineItem Payload']/following-sibling::pre" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/Awareness Radio Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"objective0\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"objective0\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/Conversion PIxel Row': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//td[normalize-space(text()) = '${objectivesConversionPixel}']/ancestor::tr"
    },
    selectors: [
      { type: 'XPATH', value: "//td[normalize-space(text()) = '${objectivesConversionPixel}']/ancestor::tr" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/Conversion Radio Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"objective2\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"objective2\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/Enable Optimization Toggle': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"objectives-status\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"objectives-status\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/Engagement Radio Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"objective1\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"objective1\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/Goal Priority Input(Delivery)': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"objectives-priorityCheckbox_0\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"objectives-priorityCheckbox_0\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/Goal Priority Input(Margin)': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"objectives-priorityCheckbox_2\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"objectives-priorityCheckbox_2\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/Goal Priority Input(Performance)': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"objectives-priorityCheckbox_1\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"objectives-priorityCheckbox_1\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/Goal Priority Label(Delivery)': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"objectives-priorityCheckbox_0\"]/following-sibling::label"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"objectives-priorityCheckbox_0\"]/following-sibling::label" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/Goal Priority Label(Margin)': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"objectives-priorityCheckbox_2\"]/following-sibling::label"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"objectives-priorityCheckbox_2\"]/following-sibling::label" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/Goal Priority Label(Performance)': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"objectives-priorityCheckbox_1\"]/following-sibling::label"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"objectives-priorityCheckbox_1\"]/following-sibling::label" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/Media Math/Units Value Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"required-units-value\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"required-units-value\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/a_ObjectivesTab': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='order-parent-nav-objectives']"
    },
    selectors: [
      { type: 'CSS', value: "#order-parent-nav-objectives" },
      { type: 'XPATH', value: "//a[@id='order-parent-nav-objectives']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/button_ObjectivesConversionPixelsContinue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='conversion-pixel-modal-continue']"
    },
    selectors: [
      { type: 'CSS', value: "#conversion-pixel-modal-continue" },
      { type: 'XPATH', value: "//button[@id='conversion-pixel-modal-continue']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/button_ObjectivesEditConversionPixel': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='objectives-conversion-pixel-modal']"
    },
    selectors: [
      { type: 'CSS', value: "#objectives-conversion-pixel-modal" },
      { type: 'XPATH', value: "//button[@id='objectives-conversion-pixel-modal']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/input_ObjectivesAdminOnlyMinMargin': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='objectives-minMargin']"
    },
    selectors: [
      { type: 'CSS', value: "#objectives-minMargin" },
      { type: 'XPATH', value: "//input[@id='objectives-minMargin']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/input_ObjectivesAdminOnlyOptimizationAmount': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='objectives-optimization_ammount']"
    },
    selectors: [
      { type: 'CSS', value: "#objectives-optimization_ammount" },
      { type: 'XPATH', value: "//input[@id='objectives-optimization_ammount']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/input_ObjectivesConversionPixelsSearch': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='conversion-pixel-modal-search']"
    },
    selectors: [
      { type: 'CSS', value: "#conversion-pixel-modal-search" },
      { type: 'XPATH', value: "//input[@id='conversion-pixel-modal-search']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/label_ObjectivesAdminOnlyOptimizationMethodToggle': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[@for='objectives-status']"
    },
    selectors: [
      { type: 'CSS', value: "span.custom-switch-label-value.ng-star-inserted" },
      { type: 'XPATH', value: "//label[@for='objectives-status']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/label_ObjectivesType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[text() = '${objectivesType}' or . = '${objectivesType}']"
    },
    selectors: [
      { type: 'CSS', value: "label.ad-radio-button-label" },
      { type: 'XPATH', value: "//label[text() = '${objectivesType}' or . = '${objectivesType}']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/select_ObjectivesAdminOnlyOptimizationType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='objectives-optimization_value']"
    },
    selectors: [
      { type: 'CSS', value: "#objectives-optimization_value" },
      { type: 'XPATH', value: "//select[@id='objectives-optimization_value']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/select_ObjectivesConversionPixelsType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='conversion-pixel-modal-pixel-type']"
    },
    selectors: [
      { type: 'CSS', value: "#conversion-pixel-modal-pixel-type" },
      { type: 'XPATH', value: "//select[@id='conversion-pixel-modal-pixel-type']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/select_ObjectivesGoal': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='objectives-coverage']"
    },
    selectors: [
      { type: 'CSS', value: "#objectives-coverage" },
      { type: 'XPATH', value: "//select[@id='objectives-coverage']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/span_ObjectivesAdminOnlyAccordion': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@data-test-id=\"objectives-admin-only-accordion\"]"
    },
    selectors: [
      { type: 'CSS', value: "span.ad-icon-add.ad-icon-small.ad-icon-primary-s2.ng-star-inserted" },
      { type: 'XPATH', value: "//div[@data-test-id=\"objectives-admin-only-accordion\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Objectives-Tab/td_ObjectivesConversionPixelsSelection': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//td[text() = ' ${objectivesConversionPixel} ' or . = ' ${objectivesConversionPixel} ']"
    },
    selectors: [
      { type: 'XPATH', value: "//td[text() = ' ${objectivesConversionPixel} ' or . = ' ${objectivesConversionPixel} ']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Order Action Menu Item': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id=\"orders-list-item-${index}-menu-toggle\"]/following-sibling::ngb-popover-window//ul//li//a[text()=\"${menuItem}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//span[@id=\"orders-list-item-${index}-menu-toggle\"]/following-sibling::ngb-popover-window//ul//li//a[text()=\"${menuItem}\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Order Action Menu': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id=\"orders-list-item-${index}-menu-toggle\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//span[@id=\"orders-list-item-${index}-menu-toggle\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Orders-Tab/DFP Line Item Name': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@title=\"${dfpId}\"]/ancestor::div[contains(@class, \"list-item\")]//div[contains(@class, \"list-item-header\")]//h4//a"
    },
    selectors: [
      { type: 'XPATH', value: "//span[@title=\"${dfpId}\"]/ancestor::div[contains(@class, \"list-item\")]//div[contains(@class, \"list-item-header\")]//h4//a" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Orders-Tab/DFP Order Loading Icon': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@title=\"${dfpId}\"]/ancestor::div[contains(@class, \"list-item\")]/descendant::ul[contains(@class, \"status-icon-container\")]//li//span[contains(@class, \"ad-circle-icon-loading\")]"
    },
    selectors: [
      { type: 'XPATH', value: "//span[@title=\"${dfpId}\"]/ancestor::div[contains(@class, \"list-item\")]/descendant::ul[contains(@class, \"status-icon-container\")]//li//span[contains(@class, \"ad-circle-icon-loading\")]" },
      { type: 'CSS', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Orders-Tab/a_Orders': {
    kind: 'web',
    selectorMethod: 'BASIC',
    preferred: {
      type: 'BASIC',
      value: "//*[@href = '/orders' and (text() = 'Orders' or . = 'Orders')]"
    },
    selectors: [
      { type: 'CSS', value: "a.nav-link" },
      { type: 'XPATH', value: "//a[contains(text(),'Orders')]" },
      { type: 'BASIC', value: "//*[@href = '/orders' and (text() = 'Orders' or . = 'Orders')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Orders-Tab/h4_CreateOrderListLineItemName': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[contains(@class,'list-item-header')]//h4/a[. = '${headerText}']"
    },
    selectors: [
      { type: 'CSS', value: "h4.list-item-title.link-title.disabled" },
      { type: 'XPATH', value: "//div[contains(@class,'list-item-header')]//h4/a[. = '${headerText}']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Orders-Tab/h4_CreateOrderListLineItemName_ContainingText': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[contains(@class,'list-item-header')]//h4/a[contains(., '${lineItemName}')]"
    },
    selectors: [
      { type: 'CSS', value: "h4.list-item-title.link-title.disabled" },
      { type: 'XPATH', value: "//div[contains(@class,'list-item-header')]//h4/a[contains(., '${lineItemName}')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Orders-Tab/input_OrdersSearch': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='orders-search']"
    },
    selectors: [
      { type: 'CSS', value: "#orders-search" },
      { type: 'XPATH', value: "//input[@id='orders-search']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Orders-Tab/li_OrderStatus': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='DPM'])[1]/following::li[1]"
    },
    selectors: [
      { type: 'CSS', value: "li.green-text.pb-1.ng-tns-c177-1.ng-star-inserted" },
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='DPM'])[1]/following::li[1]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Orders-Tab/span_CreateOrderListAdvertiser': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Advertiser:'])[1]/following::span[1]"
    },
    selectors: [
      { type: 'CSS', value: "span.attribute-value.ng-star-inserted" },
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Advertiser:'])[1]/following::span[1]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Orders-Tab/span_CreateOrderListCreative': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Creative:'])[1]/following::span[1]"
    },
    selectors: [
      { type: 'CSS', value: "li.attribute.ng-star-inserted > span.attribute-value" },
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Creative:'])[1]/following::span[1]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Orders-Tab/span_CreateOrderListDateTime': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='test1'])[1]/following::span[2]"
    },
    selectors: [
      { type: 'CSS', value: "span.charcoal-text.ml-2.ng-star-inserted" },
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='test1'])[1]/following::span[2]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Orders-Tab/span_CreateOrderListGoal': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Goal:'])[1]/following::span[1]"
    },
    selectors: [
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Goal:'])[1]/following::span[1]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Orders-Tab/span_DFPID': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@title=\"${dfpId}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//span[@title=\"${dfpId}\"]" },
      { type: 'CSS', value: "h4.list-item-title.link-title.disabled" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/button_SplitsAllocationCancel': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='split-allocation-modal-cancel']"
    },
    selectors: [
      { type: 'CSS', value: "#split-allocation-modal-cancel" },
      { type: 'XPATH', value: "//button[@id='split-allocation-modal-cancel']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/button_SplitsAllocationClearAll': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='split-allocation-modal-clear-all']"
    },
    selectors: [
      { type: 'CSS', value: "#split-allocation-modal-clear-all" },
      { type: 'XPATH', value: "//button[@id='split-allocation-modal-clear-all']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/button_SplitsAllocationContinue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='split-allocation-modal-continue']"
    },
    selectors: [
      { type: 'CSS', value: "#split-allocation-modal-continue" },
      { type: 'XPATH', value: "//button[@id='split-allocation-modal-continue']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/button_SplitsAllocationDivideEqually': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='split-allocation-modal-divide-equally']"
    },
    selectors: [
      { type: 'CSS', value: "#split-allocation-modal-divide-equally" },
      { type: 'XPATH', value: "//button[@id='split-allocation-modal-divide-equally']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/input_SplitsAllicationPercentageForGroup': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[contains(@data-test-id, 'split-allocation-modal-editValue-${groupNumber}')]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[contains(@data-test-id, 'split-allocation-modal-editValue-${groupNumber}')]" },
      { type: 'CSS', value: "#split-allocation-modal-editValue0" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/span_SplitsAllicationGroupName': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[contains(text(),'${groupName}')]"
    },
    selectors: [
      { type: 'XPATH', value: "//div[contains(text(),'${groupName}')]" },
      { type: 'CSS', value: "div.col-8.d-flex.align-items-center > span" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/span_SplitsAllicationLockGroup': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[contains(@data-test-id, 'split-allocation-modal-editValue-${groupNumber}')]/parent::div/parent::div//span[contains(@class, \"ad-icon-${lockStatus}\")]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[contains(@data-test-id, 'split-allocation-modal-editValue-${groupNumber}')]/parent::div/parent::div//span[contains(@class, \"ad-icon-${lockStatus}\")]" },
      { type: 'CSS', value: "span.ad-icon-primary-s2.btn-overlay.ad-icon-unlock" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/span_SplitsAllicationPercentageAllocated': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Allocation'])[2]/following::span[2]"
    },
    selectors: [
      { type: 'CSS', value: "div.sumary.d-flex.px-3.py-2.justify-content-end > span.float-right" },
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Allocation'])[2]/following::span[2]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/AppNexus LineItem Targeting Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"split-segmentToggle\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"split-segmentToggle\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/AppNexus LineItem Targeting Label': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"split-segmentToggle\"]/following-sibling::label"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//input[@id=\"split-segmentToggle\"]/following-sibling::label" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/AudienceTab/a_SplitsAudienceTab': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='split-tab-nav-bar-audience-link']"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id='split-tab-nav-bar-audience-link']" },
      { type: 'CSS', value: "#split-tab-nav-bar-audience-link" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/AudienceTab/article_SplitsAudienceSubgroup': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(((//article[contains(@class, 'audience__group')])[${groupIndex}])//article[@dnddragoverclass='audience__subgroup--dragover'])[${subgroupIndex}]"
    },
    selectors: [
      { type: 'CSS', value: "article.card.audience__subgroup.sand.ng-star-inserted" },
      { type: 'XPATH', value: "(((//article[contains(@class, 'audience__group')])[${groupIndex}])//article[@dnddragoverclass='audience__subgroup--dragover'])[${subgroupIndex}]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/AudienceTab/button_SplitsAudienceAddSubgroup': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='split-audience-add-subgroup']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='split-audience-add-subgroup']" },
      { type: 'CSS', value: "#split-audience-add-subgroup" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/AudienceTab/button_SplitsAudienceExclude': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='split-audience-exclude']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='split-audience-exclude']" },
      { type: 'CSS', value: "#split-audience-exclude" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/AudienceTab/button_SplitsAudienceInclude': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='split-audience-include']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='split-audience-include']" },
      { type: 'CSS', value: "#split-audience-include" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/AudienceTab/button_SplitsAudienceRemoveSubgroup': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[contains(@class, 'audience__group')][${groupIndex}]//button[@id='split-audience-remove-subgroup-${subgroupIndex}']"
    },
    selectors: [
      { type: 'CSS', value: "#split-audience-remove-subgroup-0" },
      { type: 'XPATH', value: "//article[contains(@class, 'audience__group')][${groupIndex}]//button[@id='split-audience-remove-subgroup-${subgroupIndex}']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/AudienceTab/button_Splits_Audience_Remove': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[contains(@class, 'audience__group')][${groupName}]//article[contains(@class, 'audience__subgroup')][${subgroupIndex}]//button[contains(@id, 'split-audience-remove-audience-${audienceIndex}')]"
    },
    selectors: [
      { type: 'XPATH', value: "//article[contains(@class, 'audience__group')][${groupName}]//article[contains(@class, 'audience__subgroup')][${subgroupIndex}]//button[contains(@id, 'split-audience-remove-audience-${audienceIndex}')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/AudienceTab/div_SplitsAudience_Tag': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[contains(@id, 'split-audience-list-item-') and (text()='${audience}' or . ='${audience}')]"
    },
    selectors: [
      { type: 'CSS', value: "#split-audience-list-item-0" },
      { type: 'XPATH', value: "//div[contains(@id, 'split-audience-list-item-') and (text()='${audience}' or . ='${audience}')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/AudienceTab/input_SplitsAudienceSearch': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='split-audience-list-search']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='split-audience-list-search']" },
      { type: 'CSS', value: "#split-audience-list-search" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/AudienceTab/label_SplitsAudienceGroupTargetType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//article[${groupIndex}]//label[contains(@for, 'split-audience')]"
    },
    selectors: [
      { type: 'CSS', value: "label.custom-control-label" },
      { type: 'XPATH', value: "//article[${groupIndex}]//label[contains(@for, 'split-audience')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/AudienceTab/select_SplitsAudienceType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='split-audience-type']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='split-audience-type']" },
      { type: 'CSS', value: "#split-audience-type" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/Video Completion Rate Operator Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id=\"split-basic-setup-iab_view_completion_rate_operator\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id=\"split-basic-setup-iab_view_completion_rate_operator\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/a_SplitsBasicSetupTab': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='split-tab-nav-bar-basic-setup-link']"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id='split-tab-nav-bar-basic-setup-link']" },
      { type: 'CSS', value: "#split-tab-nav-bar-basic-setup-link" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/input_AudioVideoCompletionRateValue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='split-basic-setup-video-completion']"
    },
    selectors: [
      { type: 'CSS', value: "#split-basic-setup-video-completion" },
      { type: 'XPATH', value: "//input[@id='split-basic-setup-video-completion']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/input_IABListenThroughRateCheckbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='split-basic-setup-inlineCheckbox3']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='split-basic-setup-inlineCheckbox3']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/input_IABVideoCompletionRateCheckbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='split-basic-setup-inlineCheckbox3']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='split-basic-setup-inlineCheckbox3']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/input_IABVideoViewRateCheckbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='split-basic-setup-inlineCheckbox2']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='split-basic-setup-inlineCheckbox2']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/input_IABVideoViewRateValue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='split-basic-setup-iab-view-value']"
    },
    selectors: [
      { type: 'CSS', value: "#split-basic-setup-iab-view-value" },
      { type: 'XPATH', value: "//input[@id='split-basic-setup-iab-view-value']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/input_IABViewabilityRateCheckbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='split-basic-setup-inlineCheckbox1']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='split-basic-setup-inlineCheckbox1']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/input_SplitsBasicSetupBidModifiers': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='split-basic-setup-modifier']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='split-basic-setup-modifier']" },
      { type: 'CSS', value: "#split-basic-setup-modifier" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/input_SplitsBasicSetupIABViewabilityRateValue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='split-basic-setup-iab-viewability']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='split-basic-setup-iab-viewability']" },
      { type: 'CSS', value: "#split-basic-setup-iab-viewability" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/input_SplitsBasicSetupName': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='split-basic-setup-name']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='split-basic-setup-name']" },
      { type: 'CSS', value: "#split-basic-setup-name" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/label_SplitsBasicSetupStatus': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[@for='split-basic-setup-status']"
    },
    selectors: [
      { type: 'XPATH', value: "//label[@for='split-basic-setup-status']" },
      { type: 'CSS', value: "label.custom-control-label.ng-star-inserted" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/select_IABVideoViewRateOperator': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='split-basic-setup-iab_video_view_rate_operator']"
    },
    selectors: [
      { type: 'CSS', value: "#split-basic-setup-iab_video_view_rate_operator" },
      { type: 'XPATH', value: "//select[@id='split-basic-setup-iab_video_view_rate_operator']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/select_IABViewCompletionRateOperator': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='split-basic-setup-iab_view_completion_rate_operator']"
    },
    selectors: [
      { type: 'CSS', value: "#split-basic-setup-iab_view_completion_rate_operator" },
      { type: 'XPATH', value: "//select[@id='split-basic-setup-iab_view_completion_rate_operator']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/select_SplitsBasicSetupIABViewabilityRateOperator': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='split-basic-setup-iab_viewability_rate_operator']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='split-basic-setup-iab_viewability_rate_operator']" },
      { type: 'CSS', value: "#split-basic-setup-iab_viewability_rate_operator" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Creatives Tab/Delete All Splits Creatives Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='split-creatives-delete-all-creatives']"
    },
    selectors: [
      { type: 'CSS', value: "#split-creatives-delete-all-creatives" },
      { type: 'XPATH', value: "//button[@id='split-creatives-delete-all-creatives']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Creatives Tab/Edit Split Creative Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='split-creatives-edit-creatives']"
    },
    selectors: [
      { type: 'CSS', value: "#split-creatives-edit-creatives" },
      { type: 'XPATH', value: "//button[@id='split-creatives-edit-creatives']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Creatives Tab/Split Creative Modal Span': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[text()=\"${creativeName}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//span[text()=\"${creativeName}\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Creatives Tab/Split Creatives Continue Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"split-creative-modal-continue\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"split-creative-modal-continue\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Creatives Tab/Split Creatives Creative Type Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='split-creative-modal-creative-type']"
    },
    selectors: [
      { type: 'CSS', value: "#split-creative-modal-creative-type" },
      { type: 'XPATH', value: "//select[@id='split-creative-modal-creative-type']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Creatives Tab/Split Creatives Inherit Modify Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='split-creatives-inherit']//following-sibling::label"
    },
    selectors: [
      { type: 'CSS', value: "label.float-right.custom-control-label" },
      { type: 'XPATH', value: "//input[@id='split-creatives-inherit']//following-sibling::label" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Creatives Tab/Splits Creatives Modal Searchbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='split-creative-modal-list-search']"
    },
    selectors: [
      { type: 'CSS', value: "#split-creative-modal-list-search" },
      { type: 'XPATH', value: "//input[@id='split-creative-modal-list-search']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Creatives Tab/Splits Creatives Tab Link': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='split-tab-nav-bar-creatives-link']"
    },
    selectors: [
      { type: 'CSS', value: "#split-tab-nav-bar-creatives-link" },
      { type: 'XPATH', value: "//a[@id='split-tab-nav-bar-creatives-link']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/FrequencyRecency-Tab/Impression Frequency Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='split-frequency-recency-frequency-list']"
    },
    selectors: [
      { type: 'CSS', value: "#split-frequency-recency-frequency-list" },
      { type: 'XPATH', value: "//select[@id='split-frequency-recency-frequency-list']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/FrequencyRecency-Tab/Impression Frequency Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='split-frequency-recency-frequency-impressions']"
    },
    selectors: [
      { type: 'CSS', value: "#split-frequency-recency-frequency-impressions" },
      { type: 'XPATH', value: "//input[@id='split-frequency-recency-frequency-impressions']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/FrequencyRecency-Tab/Impression Recency Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='split-frequency-recency-recency-list']"
    },
    selectors: [
      { type: 'CSS', value: "#split-frequency-recency-recency-list" },
      { type: 'XPATH', value: "//select[@id='split-frequency-recency-recency-list']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/FrequencyRecency-Tab/Impression Recency Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='split-frequency-recency-recency-impressions']"
    },
    selectors: [
      { type: 'CSS', value: "#split-frequency-recency-recency-impressions" },
      { type: 'XPATH', value: "//input[@id='split-frequency-recency-recency-impressions']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/FrequencyRecency-Tab/Recency Cap Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"recency-cap\"]//following-sibling::label"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id=\"recency-cap\"]//following-sibling::label" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/FrequencyRecency-Tab/Split - Frequency  Recency Link': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='split-tab-nav-bar-frequency-recency-link']"
    },
    selectors: [
      { type: 'CSS', value: "#split-tab-nav-bar-frequency-recency-link" },
      { type: 'XPATH', value: "//a[@id='split-tab-nav-bar-frequency-recency-link']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/GeoTargeting/Selected Profile Span': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-splits-geo-targeting//strong/ancestor::span"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//app-splits-geo-targeting//strong/ancestor::span" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/GeoTargeting/a_SplitsGeoTargetingTab': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='split-tab-nav-bar-geo-targeting-link']"
    },
    selectors: [
      { type: 'CSS', value: "#split-tab-nav-bar-geo-targeting-link" },
      { type: 'XPATH', value: "//a[@id='split-tab-nav-bar-geo-targeting-link']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/GeoTargeting/button_SplitsGeoTargetingSearchResultValue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[contains(@id, 'ngb-typeahead') and . = '${tag}']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[contains(@id, 'ngb-typeahead') and . = '${tag}']" },
      { type: 'CSS', value: "#ngb-typeahead-4-0" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/GeoTargeting/div_SplitsGeoTargetingTags': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='split-geo-targeting-tag']"
    },
    selectors: [
      { type: 'CSS', value: "#split-geo-targeting-tag" },
      { type: 'XPATH', value: "//div[@id='split-geo-targeting-tag']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/GeoTargeting/i_SplitsGeoTargetingRemoveTags': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='split-geo-targeting-tag' and text() = '${tag}']/i"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='split-geo-targeting-tag' and text() = '${tag}']/i" },
      { type: 'CSS', value: "i.ad-icon-x.ad-icon-secondary-dark-s2.ad-icon-non-interactive.ml-1.ng-star-inserted" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/GeoTargeting/input_SplitsGeoTargetingInheritToggle': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='split-geo-targeting-inherit_geo' and @type='checkbox']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='split-geo-targeting-inherit_geo' and @type='checkbox']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/GeoTargeting/input_SplitsGeoTargetingSearch': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='split-geo-targeting-geoTargetSearch']"
    },
    selectors: [
      { type: 'CSS', value: "#split-geo-targeting-geoTargetSearch" },
      { type: 'XPATH', value: "//input[@id='split-geo-targeting-geoTargetSearch']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/GeoTargeting/label_SplitsGeoTargetingInheritModifyToggle': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[@for='split-geo-targeting-inherit_geo']"
    },
    selectors: [
      { type: 'XPATH', value: "//label[@for='split-geo-targeting-inherit_geo']" },
      { type: 'CSS', value: "label.custom-control-label.ng-star-inserted" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/GeoTargeting/select_SplitsGeoTargetingProfile': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='split-geo-targeting-geo-profile-select']"
    },
    selectors: [
      { type: 'CSS', value: "#split-geo-targeting-geo-profile-select" },
      { type: 'XPATH', value: "//select[@id='split-geo-targeting-geo-profile-select']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/GeoTargeting/select_SplitsGeoTargetingType': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='split-geo-targeting-geo_type']"
    },
    selectors: [
      { type: 'CSS', value: "#split-geo-targeting-geo_type" },
      { type: 'XPATH', value: "//select[@id='split-geo-targeting-geo_type']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/GeoTargeting/span_SplitsGeoTargetingTags': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='split-geo-targeting-tag']/span"
    },
    selectors: [
      { type: 'CSS', value: "span.tag-container__item__label" },
      { type: 'XPATH', value: "//div[@id='split-geo-targeting-tag']/span" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/GeoTargeting/textarea_SplitsGeoTargetingZipCodes': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id='split-geo-targeting-zips']"
    },
    selectors: [
      { type: 'CSS', value: "#split-geo-targeting-zips" },
      { type: 'XPATH', value: "//textarea[@id='split-geo-targeting-zips']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Browser Targeting Add Item Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//td[.//span[text()='Amazon Silk']]/following-sibling::td/div[@class='d-flex justify-content-center align-content-center']/div[@class='ad-icon-add ad-icon-primary-s2']"
    },
    selectors: [
      { type: 'CSS', value: "div.d-flex.flex-column.justify-content-center.align-content-center.max-height-25 > span" },
      { type: 'XPATH', value: "//td[.//span[text()='Amazon Silk']]/following-sibling::td/div[@class='d-flex justify-content-center align-content-center']/div[@class='ad-icon-add ad-icon-primary-s2']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Browser Targeting Modal Continue Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='system-targeting-modal-continue']"
    },
    selectors: [
      { type: 'CSS', value: "#system-targeting-modal-continue" },
      { type: 'XPATH', value: "//button[@id='system-targeting-modal-continue']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Browser Targeting Modal Exclude Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='system-targeting-modal-list-exclude']"
    },
    selectors: [
      { type: 'CSS', value: "#system-targeting-modal-list-exclude" },
      { type: 'XPATH', value: "//button[@id='system-targeting-modal-list-exclude']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Browser Targeting Modal List Include Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='system-targeting-modal-list-include']"
    },
    selectors: [
      { type: 'CSS', value: "#system-targeting-modal-list-include" },
      { type: 'XPATH', value: "//button[@id='system-targeting-modal-list-include']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Deal Targeting Modal Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id=\"split-inventory-deals-modal\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id=\"split-inventory-deals-modal\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Inherit Modify Checkbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id=\"split-inventory-inherit_inventory\"]/parent::div"
    },
    selectors: [
      { type: 'CSS', value: "label.custom-control-label.ng-star-inserted" },
      { type: 'XPATH', value: "//input[@id=\"split-inventory-inherit_inventory\"]/parent::div" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Inventory Link': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='split-tab-nav-bar-inventory-link']"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id='split-tab-nav-bar-inventory-link']" },
      { type: 'CSS', value: "#split-tab-nav-bar-inventory-link" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Inventory List - List Span': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//tr[@id='inventory-list-modal-list-item-0']/td[1]/div"
    },
    selectors: [
      { type: 'CSS', value: "td.column-height" },
      { type: 'XPATH', value: "//tr[@id='inventory-list-modal-list-item-0']/td[1]/div" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Inventory List - List Type': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='inventory-list-modal-type']"
    },
    selectors: [
      { type: 'CSS', value: "#inventory-list-modal-type" },
      { type: 'XPATH', value: "//select[@id='inventory-list-modal-type']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Inventory List Modal Continue Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='inventory-list-modal-continue']"
    },
    selectors: [
      { type: 'CSS', value: "#inventory-list-modal-continue" },
      { type: 'XPATH', value: "//button[@id='inventory-list-modal-continue']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Inventory List Modal Searchbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='inventory-list-modal-search']"
    },
    selectors: [
      { type: 'CSS', value: "#inventory-list-modal-search" },
      { type: 'XPATH', value: "//input[@id='inventory-list-modal-search']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Inventory Type': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='split-inventory-type']"
    },
    selectors: [
      { type: 'XPATH', value: "//select[@id='split-inventory-type']" },
      { type: 'CSS', value: "#split-inventory-type" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Seller Targeting Modal Continue Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='sellers-modal-continue']"
    },
    selectors: [
      { type: 'CSS', value: "#sellers-modal-continue" },
      { type: 'XPATH', value: "//button[@id='sellers-modal-continue']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Seller Targeting Modal Exclude Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='sellers-modal-list-exclude']"
    },
    selectors: [
      { type: 'CSS', value: "#sellers-modal-list-exclude" },
      { type: 'XPATH', value: "//button[@id='sellers-modal-list-exclude']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Seller Targeting Modal Include Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='sellers-modal-list-include']"
    },
    selectors: [
      { type: 'CSS', value: "#sellers-modal-list-include" },
      { type: 'XPATH', value: "//button[@id='sellers-modal-list-include']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Seller Targeting Modal Searchbox': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='search']"
    },
    selectors: [
      { type: 'CSS', value: "#search" },
      { type: 'XPATH', value: "//input[@id='search']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Seller Targeting Modal Span': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//tr[@id='sellers-modal-list-item-${index}']/td/div/span"
    },
    selectors: [
      { type: 'CSS', value: "div.d-flex.flex-column.justify-content-center.align-content-center.max-height-40 > span" },
      { type: 'XPATH', value: "//tr[@id='sellers-modal-list-item-${index}']/td/div/span" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Split Inventory Browser Targeting Modal Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='split-inventory-browser-targeting-modal']"
    },
    selectors: [
      { type: 'CSS', value: "#split-inventory-browser-targeting-modal" },
      { type: 'XPATH', value: "//button[@id='split-inventory-browser-targeting-modal']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Split Inventory Inventory List Modal Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='split-inventory-inventory-list-modal']"
    },
    selectors: [
      { type: 'CSS', value: "#split-inventory-inventory-list-modal" },
      { type: 'XPATH', value: "//button[@id='split-inventory-inventory-list-modal']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Split Inventory Publisher Action Dropdown': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//select[@id='split-inventory-publisher-action']"
    },
    selectors: [
      { type: 'CSS', value: "#split-inventory-publisher-action" },
      { type: 'XPATH', value: "//select[@id='split-inventory-publisher-action']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Split Inventory Publisher Ids Textarea': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//textarea[@id='split-inventory-publisherIds']"
    },
    selectors: [
      { type: 'CSS', value: "#split-inventory-publisherIds" },
      { type: 'XPATH', value: "//textarea[@id='split-inventory-publisherIds']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Split Inventory Sellers Modal Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='split-inventory-sellers-modal']"
    },
    selectors: [
      { type: 'CSS', value: "#split-inventory-sellers-modal" },
      { type: 'XPATH', value: "//button[@id='split-inventory-sellers-modal']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/Split Settings Accordian': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@title=\"Split Settings\"]//button"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@title=\"Split Settings\"]//button" },
      { type: 'CSS', value: "h5.accordion-header__title" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/div_Desktop': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='split-inventory-device-0']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='split-inventory-device-0']" },
      { type: 'CSS', value: "#split-inventory-device-0" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/div_Mobile': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='split-inventory-device-1']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='split-inventory-device-1']" },
      { type: 'CSS', value: "#split-inventory-device-1" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Inventory-Tab/div_Tablet': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='split-inventory-device-2']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='split-inventory-device-2']" },
      { type: 'CSS', value: "#split-inventory-device-2" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/Splits Settings Cog': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[contains(@class, 'settings-toggle')]"
    },
    selectors: [
      { type: 'CSS', value: "div.ad-icon-settings.ad-icon-primary.ad-icon-2x" },
      { type: 'XPATH', value: "//div[contains(@class, 'settings-toggle')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/a_Splits_DeleteGroup': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//app-splits//li//a[@id='split-delete-split'])[${groupNo}]"
    },
    selectors: [
      { type: 'XPATH', value: "(//app-splits//li//a[@id='split-delete-split'])[${groupNo}]" },
      { type: 'CSS', value: "#split-delete-split" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/a_Splits_EditGroup': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//app-splits//li//a[@id='split-edit-split'])[${groupNo}]"
    },
    selectors: [
      { type: 'XPATH', value: "(//app-splits//li//a[@id='split-edit-split'])[${groupNo}]" },
      { type: 'CSS', value: "#split-edit-split" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/a_Splits_GroupNo': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id=\"split-open-menu-${splitNumber}\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//span[@id=\"split-open-menu-${splitNumber}\"]" },
      { type: 'CSS', value: "#split-edit-split-0" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/a_Splits_Tab': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='order-parent-nav-splits']"
    },
    selectors: [
      { type: 'CSS', value: "#order-parent-nav-splits" },
      { type: 'XPATH', value: "//a[@id='order-parent-nav-splits']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/button_Create Split': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='split-add-new']"
    },
    selectors: [
      { type: 'CSS', value: "div.col > div.ng-star-inserted" },
      { type: 'BASIC', value: "//*[(text() = 'Create Split - New SplitReturn to SplitsBasic SetupAudience Geo Targeting Inventory Creatives Frequency & RecencyBasic SetupActiveName0% Allocation Bid Modifiers Bid Modifiers Inventory Performance Condition IAB Viewability RateSplits Listing' or . = 'Create Split - New SplitReturn to SplitsBasic SetupAudience Geo Targeting Inventory Creatives Frequency & RecencyBasic SetupActiveName0% Allocation Bid Modifiers Bid Modifiers Inventory Performance Condition IAB Viewability RateSplits Listing')]" },
      { type: 'XPATH', value: "//button[@id='split-add-new']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/button_SplitsSave': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='split-header-save']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='split-header-save']" },
      { type: 'CSS', value: "#split-header-save" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/button_Splits_DeleteGroupComfirmationContinue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='generic-confirm-modal-continue']"
    },
    selectors: [
      { type: 'CSS', value: "#generic-confirm-modal-continue" },
      { type: 'XPATH', value: "//button[@id='generic-confirm-modal-continue']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/button_Splits_DeleteGroupConfirmationCancel': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='generic-confirm-modal-cancel']"
    },
    selectors: [
      { type: 'CSS', value: "#generic-confirm-modal-cancel" },
      { type: 'XPATH', value: "//button[@id='generic-confirm-modal-cancel']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/div_Splits_Group': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//li[@id='568df4e6-ff1b-4777-949a-87f0201c32e2']/div[2]/div"
    },
    selectors: [
      { type: 'CSS', value: "div.col-sm-6.py-4.px-0.left-col" },
      { type: 'XPATH', value: "//li[@id='568df4e6-ff1b-4777-949a-87f0201c32e2']/div[2]/div" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/div_Splits_GroupNumber': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//li[@id='568df4e6-ff1b-4777-949a-87f0201c32e2']/div"
    },
    selectors: [
      { type: 'CSS', value: "div.index-container.ng-star-inserted" },
      { type: 'XPATH', value: "//li[@id='568df4e6-ff1b-4777-949a-87f0201c32e2']/div" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/i_Splits_CloseGroupMenu': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//li[@id='568df4e6-ff1b-4777-949a-87f0201c32e2']/div[2]/div[2]/div[2]/span/i"
    },
    selectors: [
      { type: 'CSS', value: "i.ad-icon-x.ad-icon-primary-s2.float-right.mr-2" },
      { type: 'XPATH', value: "//li[@id='568df4e6-ff1b-4777-949a-87f0201c32e2']/div[2]/div[2]/div[2]/span/i" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/li_Splits_GroupContainer': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//li[@id='3ad7ecad-bc26-4bf2-b829-1b803300f3ce']"
    },
    selectors: [
      { type: 'CSS', value: "#3ad7ecad-bc26-4bf2-b829-1b803300f3ce" },
      { type: 'XPATH', value: "//li[@id='3ad7ecad-bc26-4bf2-b829-1b803300f3ce']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/span_Return to Splits': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='split-header-cancel']/span"
    },
    selectors: [
      { type: 'CSS', value: "#split-header-cancel > span" },
      { type: 'XPATH', value: "//button[@id='split-header-cancel']/span" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/span_Splits': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id='order-parent-nav-splits']/span[2]"
    },
    selectors: [
      { type: 'CSS', value: "#order-parent-nav-splits > span.tab-title" },
      { type: 'XPATH', value: "//a[@id='order-parent-nav-splits']/span[2]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/span_SplitsOpenSplitAllocation': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id='split-open-split-allocation'][1]"
    },
    selectors: [
      { type: 'XPATH', value: "//span[@id='split-open-split-allocation'][1]" },
      { type: 'CSS', value: "#split-open-split-allocation" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/span_Splits_EditSplitAllocation': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(//span[@id='split-open-split-allocation'])[${index}]"
    },
    selectors: [
      { type: 'CSS', value: "#split-open-split-allocation" },
      { type: 'XPATH', value: "(//span[@id='split-open-split-allocation'])[${index}]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/span_Splits_GroupAllocation': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//li[@id='568df4e6-ff1b-4777-949a-87f0201c32e2']/div[2]/div/div/span[2]"
    },
    selectors: [
      { type: 'CSS', value: "span.ml-2.mr-2.ng-star-inserted" },
      { type: 'XPATH', value: "//li[@id='568df4e6-ff1b-4777-949a-87f0201c32e2']/div[2]/div/div/span[2]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/span_Splits_GroupStatus': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//li[@id='568df4e6-ff1b-4777-949a-87f0201c32e2']/div[2]/div/div/span"
    },
    selectors: [
      { type: 'CSS', value: "span.text-success.ng-star-inserted" },
      { type: 'XPATH', value: "//li[@id='568df4e6-ff1b-4777-949a-87f0201c32e2']/div[2]/div/div/span" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Splits-Tab/span_Splits_OpenGroupMenu': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id='split-open-menu-${groupNo}']"
    },
    selectors: [
      { type: 'XPATH', value: "//span[@id='split-open-menu-${groupNo}']" },
      { type: 'CSS', value: "#split-open-menu" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Submit-Order/button_PopupMessageNoAudienceContinue': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[(text() = 'Continue' or . = 'Continue')]"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-icon.btn-success > span" },
      { type: 'XPATH', value: "//button[(text() = 'Continue' or . = 'Continue')]" },
      { type: 'BASIC', value: "//*[(text() = 'Submit Order' or . = 'Submit Order')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Submit-Order/button_SubmitOrder': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='order-parent-submit-order']"
    },
    selectors: [
      { type: 'CSS', value: "button.btn.btn-icon.btn-success > span" },
      { type: 'XPATH', value: "//button[@id='order-parent-submit-order']" },
      { type: 'BASIC', value: "//*[(text() = 'Submit Order' or . = 'Submit Order')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Submit-Order/div_SubmitOrderConfirmationMessage': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//app-generic-modal//div[. = '${confirmationMessage}']"
    },
    selectors: [
      { type: 'CSS', value: "div.modal-body > div.row.ng-star-inserted > div.col" },
      { type: 'XPATH', value: "//app-generic-modal//div[. = '${confirmationMessage}']" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/Tab H2': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//h2[text()=\"${tabName}\"]"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//h2[text()=\"${tabName}\"]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/button_OrderEntry_SaveAsDraft': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[contains(span/text(), 'Save as Draft')]"
    },
    selectors: [
      { type: 'CSS', value: "#basic-setup-save-as-draft" },
      { type: 'XPATH', value: "//button[contains(span/text(), 'Save as Draft')]" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/li_Validating Order Details': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[@id=\"orders-list-item-edit-ali-${index}\"]/ancestor::div[2]//ul[contains(@class,'status-icon-container')]//li[contains(text(),'Validating Order Details') or contains(text(),'Processing')]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[@id=\"orders-list-item-edit-ali-${index}\"]/ancestor::div[2]//ul[contains(@class,'status-icon-container')]//li[contains(text(),'Validating Order Details') or contains(text(),'Processing')]" },
      { type: 'CSS', value: "li.pb-1.ng-tns-c91-1.ng-star-inserted" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/li_name': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[contains(@class,'list-item-header')]//h4/a[. = '${headerText}']"
    },
    selectors: [
      { type: 'XPATH', value: "//div[contains(@class,'list-item-header')]//h4/a[. = '${headerText}']" },
      { type: 'CSS', value: "#orders-list-item-edit-ali-0" },
    ]
  },
  'Object Repository/Frontend/Order-Entry/span_results_bar': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "(.//*[normalize-space(text()) and normalize-space(.)='Newest First'])[1]/following::span[1]"
    },
    selectors: [
      { type: 'CSS', value: "span.dark-gray-text.pager-details.mb-1.ng-tns-c91-1" },
      { type: 'XPATH', value: "(.//*[normalize-space(text()) and normalize-space(.)='Newest First'])[1]/following::span[1]" },
    ]
  },
  'Object Repository/Frontend/Users/Create User Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//a[contains(text(),'Create User')]"
    },
    selectors: [
      { type: 'XPATH', value: "//a[contains(text(),'Create User')]" },
      { type: 'CSS', value: "a.btn.btn-primary-80.text-white.btn-shadow" },
    ]
  },
  'Object Repository/Frontend/Users/Email Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='user-create-email']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='user-create-email']" },
      { type: 'CSS', value: "#user-create-email" },
    ]
  },
  'Object Repository/Frontend/Users/First Delete User Icon': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id=\"user-list-delete-user-0\"]//span"
    },
    selectors: [
      { type: 'BASIC', value: "" },
      { type: 'XPATH', value: "//div[@id=\"user-list-delete-user-0\"]//span" },
    ]
  },
  'Object Repository/Frontend/Users/First Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='user-create-first-name']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='user-create-first-name']" },
      { type: 'CSS', value: "#user-create-first-name" },
    ]
  },
  'Object Repository/Frontend/Users/Last Name Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='user-create-last-name']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='user-create-last-name']" },
      { type: 'CSS', value: "#user-create-last-name" },
    ]
  },
  'Object Repository/Frontend/Users/Manage Users Search': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='user-list-search']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='user-list-search']" },
      { type: 'CSS', value: "#user-list-search" },
    ]
  },
  'Object Repository/Frontend/Users/Password Confirmation Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='user-create-confirm-password']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='user-create-confirm-password']" },
      { type: 'CSS', value: "#user-create-confirm-password" },
    ]
  },
  'Object Repository/Frontend/Users/Password Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//input[@id='user-create-password']"
    },
    selectors: [
      { type: 'XPATH', value: "//input[@id='user-create-password']" },
      { type: 'CSS', value: "#user-create-password" },
    ]
  },
  'Object Repository/Frontend/Users/Permission Group Input': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//label[text()=\"${permissionGroup}\"]"
    },
    selectors: [
      { type: 'CSS', value: "" },
      { type: 'XPATH', value: "//label[text()=\"${permissionGroup}\"]" },
    ]
  },
  'Object Repository/Frontend/Users/Reset User Search Icon': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//span[@id=\"user-list-search-reset\"]"
    },
    selectors: [
      { type: 'XPATH', value: "//span[@id=\"user-list-search-reset\"]" },
      { type: 'BASIC', value: "" },
    ]
  },
  'Object Repository/Frontend/Users/Submit User Button': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//button[@id='user-create-submit']"
    },
    selectors: [
      { type: 'XPATH', value: "//button[@id='user-create-submit']" },
      { type: 'CSS', value: "#user-create-submit" },
    ]
  },
  'Object Repository/Frontend/Users/User Row Edit Icon': {
    kind: 'web',
    selectorMethod: 'XPATH',
    preferred: {
      type: 'XPATH',
      value: "//div[@id='user-list-edit-user-${rowIndex}']/span"
    },
    selectors: [
      { type: 'XPATH', value: "//div[@id='user-list-edit-user-${rowIndex}']/span" },
      { type: 'CSS', value: "span.ad-icon-edit.ad-icon-primary-s1" },
    ]
  },
} as const;
