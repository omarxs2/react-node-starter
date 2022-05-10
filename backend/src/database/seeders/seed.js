const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert(
    //   'University',
    //   [
    //     {
    //       university_name_en: 'Istanbul Bilgi University',
    //       university_name_ar: 'جامعة اسطنبول بيلجي',
    //       color:'#3f51b5'
    //     },
    //     {
    //       university_name_en: 'Istanbul Aydin University',
    //       university_name_ar: 'جامعة اسطنبول ايدن',
    //       color:'#9c27b0'
    //     },
    //     {
    //       university_name_en: 'Istanbul Medipol University',
    //       university_name_ar: 'جامعة اسطنبول ميديبول',
    //       color:'#f44336'
    //     },
    //     {
    //       university_name_en: 'Bahcesehir University',
    //       university_name_ar: 'جامعة بهتشي شيهير',
    //       color:'#607d8b'
    //     },
    //     {
    //       university_name_en: 'Istinye University',
    //       university_name_ar: 'جامعة استينيا',
    //       color:'#fccb00'
    //     },
    //     {
    //       university_name_en: 'Halic University',
    //       university_name_ar: 'جامعة خليج',
    //       color:'#03a9f4'
    //     }, 
    //   ],
    //   {},
    // );
    // await queryInterface.bulkInsert(
    //   'Department',
    //   [
    //     {
    //       department_name_en: 'Computer Engineering',
    //       department_name_ar: 'هندسة حاسوب',
    //       years:4
    //     },
    //     {
    //       department_name_en: 'Medicine',
    //       department_name_ar: 'طب عام',
    //       years:6
    //     },
    //     {
    //       department_name_en: 'Nursing',
    //       department_name_ar: 'تمريض',
    //       years:4
    //     },
    //     {
    //       department_name_en: 'Mechanical Engineering',
    //       department_name_ar: 'هندسة ميكانيك',
    //       years:4
    //     },
    //     {
    //       department_name_en: 'International Relations',
    //       department_name_ar: 'علاقات دولية',
    //       years:4
    //     },
    //     {
    //       department_name_en: 'Business Adminstration',
    //       department_name_ar: 'ادارة اعمال',
    //       years:4
    //     }, 
    //   ],
    //   {},
    // );
    await queryInterface.bulkInsert(
      'User',
      [
        {
          isActive: true, 
          name: 'Omar Suleinan',
          email: 'omar@eduturk.net',
          password: await bcrypt.hashSync('1234', 10),
          role: 'Admin',
          phone:'05321456',
          company:'Eduturk',
          logo:'',
          country:'Palestine'
        }
      ],
      {},
    );
    // await queryInterface.bulkInsert(
    //   'Price',
    //   [
    //     {
    //       department_id: 1, 
    //       university_id: 1,
    //       language: 'English',
    //       currency: 'dollar',
    //       price_before: 9450,
    //       price_after: 6600,
    //     },
    //     {
    //       department_name_en: 'Mechanical Engineering', 
    //       department_name_ar: 'هندسة ميكانيك',
    //       university: 'Istanbul Bilgi University',
    //       language: 'English',
    //       years: 4,
    //       price_before: 9450,
    //       price_after: 6600,
    //     },
    //     {
    //       department_name_en: 'Nursing', 
    //       department_name_ar: 'تمريض',
    //       university: 'Istanbul Bilgi University',
    //       language: 'Turkish',
    //       years: 4,
    //       price_before: 7000,
    //       price_after: 3030,
    //     },
    //     {
    //       department_name_en: 'Medicine', 
    //       department_name_ar: 'طب',
    //       university: 'Istanbul Aydin University',
    //       language: 'English',
    //       years: 6,
    //       price_before: 20000,
    //       price_after: 18000,
    //     },
    //   ],
    //   {},
    // );
  },

  // async down(queryInterface, Sequelize) {
  //   await queryInterface.bulkDelete('Role');
  //   await queryInterface.bulkDelete('User');
  // },
};
