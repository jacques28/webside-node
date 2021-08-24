const sql = require('../model/model')

const User = function (user) {

         this.name = user.name;
         this.message = user.message;
        
 }

 User.create = (userInfo, result) => {
     sql.query("INSERT INTO usermsg SET ? ", [userInfo], (err, result) => {
         if (err) {
                 console.log(err);
                result(result);
                return;
         }

      
     });
     console.log(result)   
}




User.remove = (userInfo, result) => {
    sql.query("DELETE FROM usermsg WHERE ?undefine ", (err, result) => {
        if (err) {
                console.log(err);
               result(result);
               return;
        }

    });

}





User.show = (userInfo, result) => {
    sql.query("SELECT * FROM usermsg", (err, result) => {
        if (err) {
                console.log(err);
               result(result);
               return;
        }

     
    });
     
}
module.exports = User;