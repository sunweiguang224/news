// 第三方
import fs from 'fs';
import gulp from 'gulp';
import inquirer from 'inquirer';
import rename from 'gulp-rename';
import replace from 'gulp-replace';

// 自定义
import config from '../config.js';
import util from '../util.js';

/************************************ 创建新模块(npm run create) ************************************/
gulp.task('default', () => {
  console.log(`>>>>>>>>>>>>>>> 开始创建新页面。${util.getNow()}`);

  // 询问用户新页面信息
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'please input page\'s name ?',
      validate: function (input) {
        return input ? true : false;
      }
    },
    {
      type: 'input',
      name: 'title',
      message: 'please input page\'s title ?'
    }
  ]).then((answer) => {
    console.log(JSON.stringify(answer, ' ', 2));

    // 开始生成文件
    gulp.src(`${config.path.project}/build/res/create/**/*`)

    // 统一文件名称
      .pipe(rename(function (path) {
        if (path.basename.indexOf('.store') !== -1) {
          path.basename = `${answer.name}.store`;
        } else {
          path.basename = answer.name;
        }
      }))

      // 替换变量
      .pipe(replace('{{name}}', answer.name))
      .pipe(replace('{{title}}', answer.title || ''))

      // 输出文件
      .pipe(gulp.dest(`${config.path.project}/src/page/${answer.name}`))

      .on('end', function () {
        setTimeout(function () {

          // 生成空目录
          fs.mkdirSync(`${config.path.project}/src/page/${answer.name}/icon`);
          fs.mkdirSync(`${config.path.project}/src/page/${answer.name}/vue`);
          console.log(`>>>>>>>>>>>>>>> [${answer.name}] 页面已创建完毕。${util.getNow()}`);

          // 注册router
          let routerPath = `${config.path.project}/src/common/js/app/app-router.js`;
          let routerTpl = `{
          name: '${answer.name}',
          path: '/${answer.name}.html',
          meta: {
            title: '${answer.title}',
          },
          component: () => import(/* webpackChunkName: "static/page/${answer.name}/js/${answer.name}" */'../../../page/${answer.name}/${answer.name}.vue'),
        },
        // all route above ..`;
          let routerContent = fs.readFileSync(routerPath, 'utf8').replace(`// all route above ..`, routerTpl);
          fs.writeFileSync(routerPath, routerContent);
          console.log(`>>>>>>>>>>>>>>> [${answer.name}] router注册完毕。${util.getNow()}`);

          // 注册store
          let storePath = `${config.path.project}/src/common/js/app/app-store.js`;
          let storeTpl = `${answer.name}: createCommonSetting(require('../../../page/${answer.name}/js/${answer.name}.store.js').default),
        // all store above ..`;
          let storeContent = fs.readFileSync(storePath, 'utf8').replace(`// all store above ..`,storeTpl);
          fs.writeFileSync(storePath, storeContent);
          console.log(`>>>>>>>>>>>>>>> [${answer.name}] store注册完毕。${util.getNow()}`);

        }, 1000);
      })
    ;
  });

});
