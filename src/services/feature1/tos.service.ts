import TOSRepository from "./tos.repository";

interface ITOSService {
  getTOSStatus(userId: number): Promise<boolean>;

  setTOSStatus(userId: number, consented: boolean): void;
}

class TOSService implements ITOSService {
  private tosRepository: TOSRepository;
  constructor(tosRepository: TOSRepository) {
    this.tosRepository = tosRepository;
  }

  async getTOSStatus(userId: number): Promise<boolean> {
    try {
      return this.tosRepository.getTOSStatus(userId);
    } catch (e) {
      throw new Error("User not found");
    }
  }

  setTOSStatus(userId: number, consented: boolean) {}
}

export default TOSService;
