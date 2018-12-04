const {ArgumentParser} = require('argparse');
const path = require('path');

const parser = new ArgumentParser({
  addHelp: true,
  description: 'NuTonomy to XVIZ converter'
});

parser.addArgument(['-d', '--data-directory'], {
  required: true,
  help: 'Path to raw KITTI data. Relative path will be resolved relative to /data/kitti/'
});

parser.addArgument(['-o', '--output'], {
  help: 'Path to generated data. Relative path will be resolved relative to /data/generated/kitti/'
});

parser.addArgument(['--disable-streams'], {
  defaultValue: '',
  help: 'Comma separated stream names to disable'
});

parser.addArgument(['--samples-directory'], {
  required: true,
  help: 'Path to raw KITTI data. Relative path will be resolved relative to /data/kitti/'
});

parser.addArgument(['--frame-limit'], {
  defaultValue: Number.MAX_SAFE_INTEGER,
  help: 'Limit XVIZ frame generation to this value. Useful for testing conversion quickly'
});

parser.addArgument(['--image-max-width'], {
  defaultValue: 400,
  help: 'Image max width'
});

parser.addArgument(['--image-max-height'], {
  defaultValue: 300,
  help: 'Image max height'
});

parser.addArgument(['--scenes'], {
  defaultValue: '161',
  help: 'List of scene number'
});

parser.addArgument('--fake-streams', {
  defaultValue: '',
  help: 'Generate fake streams with random data for testing'
});

parser.addArgument('--list-scenes', {
  defaultValue: false,
  help: 'List available scenes (use with -d or --data-directory).'
});

// extract args from user input
module.exports = function getArgs() {
  const args = parser.parseArgs();
  const inputDir = path.resolve(__dirname, '../../../../data/nutonomy', args.data_directory);

  const samplesDir = path.resolve(__dirname, '../../../../data/nutonomy', args.samples_directory);
  const outputDir = path.resolve(
    __dirname,
    '../../../../data/generated/nutonomy',
    args.out || args.data_directory
  );
  const scenes = args.scenes
    .split(',')
    .filter(Boolean)
    .map(n => Number(n));
  console.log(inputDir, outputDir); // eslint-disable-line
  const disabledStreams = args.disable_streams.split(',').filter(Boolean);

  return {
    inputDir,
    outputDir,
    samplesDir,
    disabledStreams,
    fakeStreams: Boolean(args.fake_streams),
    imageMaxWidth: Number(args.image_max_width),
    imageMaxHeight: Number(args.image_max_height),
    frameLimit: Number(args.frame_limit),
    listScenes: args.list_scenes,
    scenes
  };
};