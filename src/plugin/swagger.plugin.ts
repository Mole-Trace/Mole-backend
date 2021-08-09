import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const enableSwagger = async (app) => {
  // const publicPath = './dist/public/';
  // const buildNumber = readFileSync('buildInfo/buildNumber', 'utf-8') || '';
  // const buildTime = readFileSync('buildInfo/buildTime', 'utf-8') || '';
  // const { version } = JSON.parse(readFileSync('package.json', 'utf-8')) || '';
  // const lastCommitMessage = readFileSync('buildInfo/lastCommitMessage', 'utf-8') || '';

  // if (!existsSync(publicPath)) {
  //   mkdirSync(publicPath);
  // }

  // const entityManager = getManager();
  // const user = await entityManager.findOne(User, { where: { id: 3 } });

  const options = new DocumentBuilder()
    .setTitle('Mole Trace Document')
    .setDescription('Mole Trace Document')
    .setVersion('1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  // writeFileSync('./dist/public/swagger.json', JSON.stringify(document, null, 2));

  SwaggerModule.setup('swagger', app, document);
};
