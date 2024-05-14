/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface CreateService {
  /**
   * the name of the service
   */
  serviceName: string;
  /**
   * the description of the service
   */
  serviceDescription?: string;
  /**
   * the ID of the project in which to create the service
   */
  projectId: string;
  /**
   * a list of IDs of the plugins to install.
   */
  pluginIds?: string[];
}