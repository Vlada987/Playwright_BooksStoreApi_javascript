exports.UtilMethods =
   class UtilMethods {


      async trimTxt(text) {

         const trimedTxt = await text.slice(1, -1);
         return trimedTxt;
      }

      async createMail() {

         const mailA = "june";
         const mailB = "@gmail.com"
         const num = await Math.floor(Math.random() * 3000);
         const mailC = await String(num);
         const mailX = mailA + mailC + mailB;
         return mailX;
      }
   }