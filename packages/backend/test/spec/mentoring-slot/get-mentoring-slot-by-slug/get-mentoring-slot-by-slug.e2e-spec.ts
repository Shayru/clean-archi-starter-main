import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { mentoringSlotBuilder } from '../mentoring-slot.e2e-builder';
import { givenExistingMentoringSlot } from '../mentoring-slot.e2e-fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get Mentoring Slot By Slug ', () => {
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

  it('should return a mentoring slot if there is a slug in the database', async () => {
    // Arrange :
    // créer une permanence en base de données avec missed à true

    const mentoringSlot = mentoringSlotBuilder().build();
    const mentoringSlotInDb = await givenExistingMentoringSlot(connection, mentoringSlot);

    const getMissedMentoringSlotsResponse = await request(app.getHttpServer()).get(
      `/api/mentoring-slots/by-slug/${mentoringSlotInDb.slug}`,
    );

    // vérifier que la réponse a bien un status 200
    expect(getMissedMentoringSlotsResponse.status).toBe(200);

    expect(getMissedMentoringSlotsResponse.body.id).toEqual(mentoringSlotInDb.id);
  });

  it('Should return a mentoring slot by Slug is not in the database', async () => {
    const getMissedMentoringSlotsResponse = await request(app.getHttpServer()).get('/api/mentoring-slots/by-slug/jean-pierre');

    expect(getMissedMentoringSlotsResponse.status).toBe(404);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
