'use strict'

import Ajv from 'ajv';
import { createVersionFromString } from './version.js';

const JSON_SCHEMA_V1 = {
  '$schema': 'https://json-schema.org/draft-07/schema#', 'type': 'object',
  'required': ['format_version', 'tooth', 'version'], 'properties': {
    'format_version': { 'const': 1 },
    'tooth': { 'type': 'string' },
    'version': { 'type': 'string' },
    'dependencies': {
      'type': 'object',
      'patternProperties': {
        '^.*$': {
          'type': 'array',
          'minItems': 1,
          'items': { 'type': 'array', 'items': { 'type': 'string' } }
        }
      }
    },
    'information': { 'type': 'object' },
    'placement': {
      'type': 'array',
      'items': {
        'type': 'object',
        'required': ['source', 'destination'],
        'properties': {
          'source': { 'type': 'string' },
          'destination': { 'type': 'string' },
          'GOOS': { 'type': 'string' },
          'GOARCH': { 'type': 'string' }
        }
      }
    },
    'possession': { 'type': 'array', 'items': { 'type': 'string' } },
    'commands': {
      'type': 'array',
      'items': {
        'type': 'object',
        'required': ['type', 'commands', 'GOOS'],
        'properties': {
          'type': { 'enum': ['install', 'uninstall'] },
          'commands': { 'type': 'array', 'items': { 'type': 'string' } },
          'GOOS': { 'type': 'string' },
          'GOARCH': { 'type': 'string' }
        }
      }
    }
  }
};

const JSON_SCHEMA_V2 = {
  '$schema': 'https://json-schema.org/draft-07/schema#', 'type': 'object',
      'properties': {
        'format_version': {'type': 'integer', 'const': 2},
        'tooth': {'type': 'string'},
        'version': {'type': 'string'},
        'info': {
          'type': 'object',
          'properties': {
            'name': {'type': 'string'},
            'description': {'type': 'string'},
            'author': {'type': 'string'}
          },
          'required': ['name', 'description', 'author']
        },
        'commands': {
          'type': 'object',
          'properties': {
            'pre_install': {'type': 'array', 'items': {'type': 'string'}},
            'post_install': {'type': 'array', 'items': {'type': 'string'}},
            'pre_uninstall': {'type': 'array', 'items': {'type': 'string'}},
            'post_uninstall': {'type': 'array', 'items': {'type': 'string'}}
          }
        },
        'dependencies': {
          'type': 'object',
          'patternProperties': {'^.*$': {'type': 'string'}}
        },
        'files': {
          'type': 'object',
          'properties': {
            'place': {
              'type': 'array',
              'items': {
                'type': 'object',
                'properties':
                    {'src': {'type': 'string'}, 'dest': {'type': 'string'}},
                'required': ['src', 'dest']
              }
            },
            'preserve': {'type': 'array', 'items': {'type': 'string'}},
            'remove': {'type': 'array', 'items': {'type': 'string'}}
          }
        },
        'platforms': {
          'type': 'array',
          'items': {
            'type': 'object',
            'properties': {
              'goarch': {'type': 'string'},
              'goos': {'type': 'string'},
              'commands': {
                'type': 'object',
                'properties': {
                  'pre_install': {'type': 'array', 'items': {'type': 'string'}},
                  'post_install':
                      {'type': 'array', 'items': {'type': 'string'}},
                  'pre_uninstall':
                      {'type': 'array', 'items': {'type': 'string'}},
                  'post_uninstall':
                      {'type': 'array', 'items': {'type': 'string'}}
                }
              },
              'dependencies': {
                'type': 'object',
                'patternProperties': {'^.*$': {'type': 'string'}}
              },
              'files': {
                'type': 'object',
                'properties': {
                  'place': {
                    'type': 'array',
                    'items': {
                      'type': 'object',
                      'properties': {
                        'src': {'type': 'string'},
                        'dest': {'type': 'string'}
                      },
                      'required': ['src', 'dest']
                    }
                  },
                  'preserve': {'type': 'array', 'items': {'type': 'string'}}
                }
              }
            },
            'required': ['goos']
          }
        }
      },
      'required': ['format_version', 'tooth', 'version', 'info']
}


/**
 * A ToothMetadata object represents the metadata of a tooth.
 */
export class ToothMetadata {
  /**
   * @param {string} toothPath The tooth path.
   * @param {Version} version The version.
   * @param {string} name The name.
   * @param {string} description The description.
   * @param {string} author The author.
   * @param {string[]} tags The tags.
   * @param {Object.<string, string>} dependencies The dependencies.
   */
  constructor(
      toothPath, version, name, description, author, tags, dependencies) {
    /** @type {string} */ this.toothPath_ = toothPath.toLowerCase();
    /** @type {import('./version.js').Version} */ this.version_ = version;
    /** @type {string} */ this.name_ = name;
    /** @type {string} */ this.description_ = description;
    /** @type {string} */ this.author_ = author;
    /** @type {string[]} */ this.tags_ = tags;
    /** @type {Object<string, string>} */ this.dependencies_ = dependencies;
  }

  /**
   * Gets the tooth path.
   * @return {string} The tooth path.
   */
  getToothPath() {
    return this.toothPath_;
  }

  /**
   * Gets the version.
   * @return {Version} The version.
   */
  getVersion() {
    return this.version_;
  }

  /**
   * Gets the name.
   * @return {string} The name.
   */
  getName() {
    return this.name_;
  }

  /**
   * Gets the description.
   * @return {string} The description.
   */
  getDescription() {
    return this.description_;
  }

  /**
   * Gets the author.
   * @return {string} The author.
   */
  getAuthor() {
    return this.author_;
  }

  /**
   * Gets the tags.
   * @return {string[]} The tags.
   */
  getTags() {
    return this.tags_;
  }

  /**
   * Gets the dependencies.
   * @return {Object.<string, string>} The dependencies.
   */
  getDependencies() {
    return this.dependencies_;
  }
}

/**
 * Creates a ToothMetadata object from a JSON string.
 * @param {string} jsonString The JSON string.
 * @returns {ToothMetadata} The ToothMetadata object.
 */
export function createToothMetadataFromJsonString(jsonString) {
  const JSON_SCHEMA = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    anyOf: [JSON_SCHEMA_V1, JSON_SCHEMA_V2],
  };

  const jsonObject = JSON.parse(jsonString);

  if (!((new Ajv()).compile(JSON_SCHEMA))(jsonObject)) {
    throw new Error('The tooth.json is not valid.');
  }

  // Create the ToothMetadata object.
  switch (jsonObject.format_version) {
    case 1:
      return createToothMetadataFromJsonV1(jsonObject);

    case 2:
      return createToothMetadataFromJsonV2(jsonObject);

    default:
      // This should never happen.
  }
}

/**
 * Creates a ToothMetadata object from a JSON object of format version 1.
 * @param {Object} jsonObject The JSON object.
 * @returns {ToothMetadata} The ToothMetadata object.
 */
function createToothMetadataFromJsonV1(jsonObject) {
  const dependencies = {};
  for (const dependency in jsonObject.dependencies) {
    dependencies[dependency] = jsonObject.dependencies[dependency].toString();
  }

  // Create the ToothMetadata object.
  const toothMetadata = new ToothMetadata(
      jsonObject.tooth, createVersionFromString(jsonObject.version),
      jsonObject.information.name || '',
      jsonObject.information.description || '',
      jsonObject.information.author || '', jsonObject.information.tags || [],
      dependencies);

  return toothMetadata;
}

/**
 * Creates a ToothMetadata object from a JSON object of format version 2.
 * @param {Object} jsonObject The JSON object.
 * @returns {ToothMetadata} The ToothMetadata object.
 */
function createToothMetadataFromJsonV2(jsonObject) {
  const toothMetadata = new ToothMetadata(
      jsonObject.tooth, createVersionFromString(jsonObject.version),
      jsonObject.info.name, jsonObject.info.description, jsonObject.info.author,
      jsonObject.info.tags || [], jsonObject.dependencies);

  return toothMetadata;
}
