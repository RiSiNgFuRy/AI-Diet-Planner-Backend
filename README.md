# AI-Diet-Planner-Backend
[Frontend](https://github.com/RiSiNgFuRy/AI-Diet-Planner-App)
- Backend for an AI-powered diet planning app which handles server-side code and functionality.
- Uses **PostgreSQL** for reliable and scalable data storage.
- Integration of **PythonShell** for Script Execution.
- Implements secure verification and validation for inputs at server side itself.
- Encrypts user passwords using **hash and salt techniques** for enhanced security.
- Generates and validates **JSON Web Tokens (JWT)** for secure authentication and authorization.
  
## Setup
1. Execute commands in command prompt(***admin***) to restore the database:
   
   ```
   cd C:\Program Files\PostgreSQL\11\bin
   createdb -T template0 database_name
   pg_restore -d database_name [aiDietPlannerDb.dump file PATH]
   ```
3. Change ***scriptPath*** to your python code folder's complete path at **Line 63** in **...\aiDietPlanner_backend\models\users.js** 
   ```
   scriptPath: "[FOLDER_PATH]"
   ```
4. Change file name to your main **.py** file at **Line 67** in **...\aiDietPlanner_backend\models\users.js**
   ```
   let dietChartObj = await PythonShell.run("[FILE_NAME].py", options)
   ```
5. Enter following commands in IDE terminal simultaneously
   ```
   npm install
   npm start
   ```
6. Active Port: 3001 (can be changed from **\aiDietPlanner_backend\app.js** file)
