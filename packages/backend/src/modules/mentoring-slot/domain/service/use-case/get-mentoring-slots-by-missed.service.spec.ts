import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';
import MentoringSlotCreationDuplicateVerifierService from '@src/modules/mentoring-slot/domain/service/utils/mentoring-slot-creation-duplicate-verifier/mentoring-slot-creation-duplicate-verifier.service';
import {
  createMentoringSlotInput,
  mentoringSlots,
} from '@src/modules/mentoring-slot/domain/service/utils/mentoring-slot-creation-duplicate-verifier/mentoring-slot-creation-duplicate-verifier.fixture';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { GetMentoringSlotsByMissedService } from './get-mentoring-slots-by-missed.service';

describe('get mentoring slots by missed only if the user is authentica', () => {
  let mentoringSlotRepositoryMock: MentoringSlotRepositoryInterface;

  beforeAll(() => {
    mentoringSlotRepositoryMock = {
      findMentoringSlotsByMissed: () => [],
    } as unknown as MentoringSlotRepositoryInterface;
  });

  it('should throw an exception if user is not Autenticated', async () => {
    mentoringSlotRepositoryMock = {} as unknown as MentoringSlotRepositoryInterface;

    const mentoringSlotRepositoryMockImpl = {
      ...mentoringSlotRepositoryMock,
    } as unknown as MentoringSlotRepositoryInterface;

    const getMentoringSlotsByMissedService = new GetMentoringSlotsByMissedService(mentoringSlotRepositoryMockImpl);

    await expect(() => getMentoringSlotsByMissedService.getMentoringSlotsByMissed(false)).rejects.toThrow(Error);
  });

  it('should return the mentoring slots by missed if the user is authenticated', async () => {
    const mentoringSlotRepositoryMockImpl = {
      ...mentoringSlotRepositoryMock,
      findMentoringSlotsByMissed: () => mentoringSlots,
    } as unknown as MentoringSlotRepositoryInterface;

    const getMentoringSlotsByMissedService = new GetMentoringSlotsByMissedService(mentoringSlotRepositoryMockImpl);

    const returnValue = await getMentoringSlotsByMissedService.getMentoringSlotsByMissed(true);
    expect(returnValue).toEqual(mentoringSlots);
  });
});
