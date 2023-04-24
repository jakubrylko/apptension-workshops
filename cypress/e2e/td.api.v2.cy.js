import { sendRequest } from '../support/send-request';
import {
  firstProject,
  archiveProject,
  newProject,
  addResource,
  addBooking,
  addTimeEntry,
} from '../support/request-body';

describe('Teamdeck API', () => {
  let projectId;

  it('[A-3] Should create new project', () => {
    // Add new project
    sendRequest('POST', '/projects', firstProject).then((response) => {
      expect(response.status).to.equal(201);
      projectId = response.body.id;

      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('name', firstProject.name);
      expect(response.body).to.have.property('color', firstProject.color);
      expect(response.body.archived).to.equal(false);
    });

    // Get list of projects
    sendRequest('GET', '/projects?sort=-id').then((response) => {
      expect(response.status).to.equal(200);

      const project = Cypress._.find(response.body, { id: projectId });
      expect(project.id).to.exist.and.equal(projectId);
    });
  });

  it('[A-1] Should get single project', () => {
    // Get single project
    sendRequest('GET', `/projects/${projectId}`).then((response) => {
      expect(response.status).to.equal(200);

      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('name', firstProject.name);
      expect(response.body).to.have.property('color', firstProject.color);
      expect(response.body.archived).to.equal(false);
    });
  });

  it('[A-2] Should get list of projects', () => {
    const idArr = [];
    const nameArr = [];

    // Get list of projects
    sendRequest('GET', '/projects?sort=-id').then((response) => {
      expect(response.status).to.equal(200);

      expect(response.body).to.be.an('array');
      response.body.forEach(($element) => {
        expect($element).to.be.an('object');
      });

      response.body.forEach(($element) => {
        expect($element).to.have.property('id').and.be.a('number');
        expect($element).to.have.property('name').and.be.a('string');
        expect($element)
          .to.have.property('color')
          .and.match(/^#[0-9a-fA-F]{6}$/);
        expect($element).to.have.property('archived').and.be.a('boolean');
      });

      response.body.forEach(($element) => idArr.push($element.id));
      expect(Cypress._.uniq(idArr).length).to.equal(idArr.length);

      response.body.forEach(($element) => nameArr.push($element.name));
      console.log(nameArr);
    });
  });

  it('[A-4] Should update existing project', () => {
    // Update project
    sendRequest('PUT', `/projects/${projectId}`, archiveProject).then((response) => {
      expect(response.status).to.equal(200);

      expect(response.body).to.have.property('id', projectId);
      expect(response.body).to.have.property('name', archiveProject.name);
      expect(response.body).to.have.property('color', archiveProject.color);
      expect(response.body.archived).to.equal(true);
    });

    // Get list of projects
    sendRequest('GET', '/projects?sort=-id').then((response) => {
      expect(response.status).to.equal(200);

      const updatedProject = Cypress._.find(response.body, { id: projectId });
      expect(updatedProject.id).to.exist.and.equal(projectId);
    });
  });

  it('[A-5] Should create project, resource, booking and time entry', () => {
    let mainUnitId;
    let resourceId;
    let adminId;
    let timeEntryId;

    // Add new project
    sendRequest('POST', '/projects', newProject).then((response) => {
      expect(response.status).to.equal(201);
      projectId = response.body.id;
    });

    // Get units in organization
    sendRequest('GET', '/organization-units').then((response) => {
      expect(response.status).to.equal(200);
      const mainUnit = response.body.find((obj) => obj.name === 'Main');

      mainUnitId = mainUnit.id;
      expect(mainUnitId).to.be.a('number');
    });

    // Add new basic resource
    const resource = addResource(mainUnitId);
    sendRequest('POST', '/resources', resource).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');

      resourceId = response.body.id;
      expect(resourceId).to.be.a('number');

      // Activate new resource
      sendRequest('PUT', `/resources/${resourceId}/activate`).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.active).to.equal(true);
      });
    });

    // Get resources in organization
    sendRequest('GET', '/resources').then((response) => {
      expect(response.status).to.equal(200);
      const admin = response.body.find((obj) => obj.role === 'superadmin');

      adminId = admin.id;
      expect(adminId).to.be.a('number');

      // Add booking for resource
      const booking = addBooking(resourceId, projectId, adminId);
      sendRequest('POST', '/bookings', booking).then((response) => {
        expect(response.status).to.equal(201);
      });

      // Add time entry for resource
      const timeEntry = addTimeEntry(resourceId, projectId, adminId);
      sendRequest('POST', '/time-entries', timeEntry).then((response) => {
        expect(response.status).to.equal(201);

        timeEntryId = response.body.id;
        expect(timeEntryId).to.be.a('number');
      });

      // Get time entries in organization
      sendRequest('GET', '/time-entries?sort=-id').then((response) => {
        expect(response.status).to.equal(200);

        const entry = Cypress._.find(response.body, { id: timeEntryId });
        expect(entry.id).to.exist.and.equal(timeEntryId);
      });
    });
  });
});
