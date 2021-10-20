const anchors = require('../examples/dock-anchors');
const jobs = require('../examples/dock-jobs');

const anchorFlow = async () => {
  // create the anchor
  const createResult = await anchors.createAnchor();

  await jobs.waitForJobCompletion(createResult.id);

  // Retrieve the created anchor directly
  await anchors.getAnchor(createResult.data.root);
};

anchorFlow();
