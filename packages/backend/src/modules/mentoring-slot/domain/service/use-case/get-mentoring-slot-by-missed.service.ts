import MentoringSlotRepository from '@src/modules/mentoring-slot/infrastructure/db/repository/mentoring-slot.repository';
import MentoringSlot from '../../model/entity/mentoring-slot.entity';
import { MentoringSlotRepositoryInterface } from '../../port/db/mentoring-slot.repository.interface';

export class GetMentoringSlotsByMissedService {
  constructor(private readonly mentoringSlotRepository: MentoringSlotRepositoryInterface) {}

  async getMentoringSlotsByMissed(): Promise<MentoringSlot[]> {
    const mentoringSlots = await this.mentoringSlotRepository.findMentoringSlotsByMissed();
    return mentoringSlots;
  }
}
