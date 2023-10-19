import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { mentoringSlotBuilder } from '../mentoring-slot.e2e-builder';
import { givenExistingMentoringSlot } from '../mentoring-slot.e2e-fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get Missed Mentoring Slots ', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  // beforeAll est fonction mise à dispo par Vitest (framework de test)
  // qui sera executée avant tous les tests
  // permet de créer l'application et la connection à la base de données
  // et les stocker dans des variables globales (dispos pour tous les tests de ce fichier)
  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('should not return any missed mentoring slots if there is no missed mentoring slots in DB', async () => {
    // envoyer une requête HTTP GET sur l'url /api/mentoring-slots/was-missed
    // récupèrer la réponse HTTP

    const getMissedMentoringSlotsResponse = await request(app.getHttpServer()).get('/api/mentoring-slots/was-missed');

    // vérifier que la réponse a bien un status 200
    expect(getMissedMentoringSlotsResponse.status).toBe(200);

    // vérifier que la réponse a bien un body avec un tableau vide
    expect(getMissedMentoringSlotsResponse.body).toEqual([]);
    // même chose que :
    expect(getMissedMentoringSlotsResponse.body.length).toBe(0);
  });

  it('should return a mentoring slot if there is a missed mentionoring slot in the database', async () => {
    // Arrange :
    // créer une permanence en base de données avec missed à true

    const mentoringSlot = mentoringSlotBuilder().withWasMissed(true).build();
    const mentoringSlotInDb = await givenExistingMentoringSlot(connection, mentoringSlot);

    const getMissedMentoringSlotsResponse = await request(app.getHttpServer()).get('/api/mentoring-slots/was-missed');

    // vérifier que la réponse a bien un status 200
    expect(getMissedMentoringSlotsResponse.status).toBe(200);

    // vérifier que la réponse a bien un body avec un tableau vide
    expect(getMissedMentoringSlotsResponse.body.length).toEqual(1);

    expect(getMissedMentoringSlotsResponse.body[0].id).toEqual(mentoringSlotInDb.id);
    expect(getMissedMentoringSlotsResponse.body[0].startDate).toEqual(mentoringSlotInDb.startDate);
    expect(getMissedMentoringSlotsResponse.body[0].endDate).toEqual(mentoringSlotInDb.endDate);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
