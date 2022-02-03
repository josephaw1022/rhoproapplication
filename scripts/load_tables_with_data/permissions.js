

const CommonFields = require("./utils/handle_common_fields");
const PostItem = require("./utils/post_item");
const {handleSQLRequest} = require("../db_client")


const createPermission = () => { 

}

const main = async () => { 
    try{ 

    const accountIDList = await handleSQLRequest(`SELECT id from accounts ; `).then(list => list.map(listItem => listItem.id))
    console.log(accountIDList)

    const permission_groups = ['super_admin', 'admin', 'exec', 'brother'] 

    

    let list = accountIDList.map((accountID,  index)  => { 
        let permissionObject = {permission_group: 'brother', account_id:accountID}
        if(index==29) permissionObject['permission_group'] = 'super-admin'
        if(index==39) permissionObject['permission_group'] = 'admin'
        if(index>30 && index<38) permissionObject['permission_group'] = 'exec'
         return permissionObject 
    })

    list.map(listItem => PostItem(listItem, 'permissions'))


    }catch(error){ 
        console.log(error)
    }

}


main()