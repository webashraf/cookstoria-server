import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>
) => {
  const result = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteFacilityIntoDB = async (id: string) => {
  const result = await Facility.findByIdAndDelete(id);
  return result;
};

const retriveFacilityFromDB = async (id: string) => {
  const result = await Facility.find();
  return result;
};

export const FacilityService = {
  createFacilityIntoDB,
  updateFacilityIntoDB,
  deleteFacilityIntoDB,
  retriveFacilityFromDB,
};
