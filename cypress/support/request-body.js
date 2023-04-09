import { hexColorGenerator, numberGenerator } from './data-gen';

const randomNumber = numberGenerator();
const randomColor = hexColorGenerator();

export const firstProject = {
  name: `JR Cypress Project ${randomNumber}`,
  color: randomColor,
  archived: false,
};

export const archiveProject = {
  name: `JR Cypress Project ${randomNumber}`,
  color: randomColor,
  archived: true,
};

const newNumber = numberGenerator();
const newColor = hexColorGenerator();

export const newProject = {
  name: `JR Cypress Project ${newNumber}`,
  color: newColor,
  archived: false,
};

export const addResource = (unitId) => ({
  name: `JR Cypress Project ${newNumber}`,
  active: false,
  is_part_time: true,
  contract_start_date: '2023-04-20',
  contract_end_date: '2030-08-20',
  organization_unit_id: unitId,
});

export const addBooking = (resourceId, projectId, adminId) => ({
  resource_id: resourceId,
  project_id: projectId,
  minutes: 480,
  weekend_booking: true,
  holidays_booking: true,
  vacations_booking: true,
  description: 'Commercial project',
  external_id: 'string',
  start_date: '2023-05-01',
  end_date: '2023-05-30',
  creator_resource_id: adminId,
  editor_resource_id: adminId,
});

export const addTimeEntry = (resourceId, projectId, adminId) => ({
  resource_id: resourceId,
  project_id: projectId,
  minutes: 240,
  weekend_booking: true,
  holidays_booking: true,
  vacations_booking: true,
  description: 'Commercial project',
  external_id: 'string',
  start_date: '2023-05-01',
  end_date: '2023-05-01',
  creator_resource_id: adminId,
  editor_resource_id: adminId,
});
