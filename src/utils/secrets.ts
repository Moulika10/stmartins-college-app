import { readFileSync } from "fs"

function readSecret(secretPath: string, encoding?: BufferEncoding): string {
  /**
   * For details: https://dtnse1.atlassian.net/wiki/spaces/ACP/pages/33465925747/k8s+Secrets
   * Usage readSecret('/etc/secrets/secret_item')
   * By default, your secret is mounted to /etc/secrets folder. Check values.yml under chart folder for the definition
   *
   * @param secretPath - Where your secret is stored
   * @param encoding - If your secret contains a special character, define the encoding here.
   * @returns secret
   *
   */
  encoding = encoding || "utf-8"
  const secret = readFileSync(secretPath, { encoding: encoding })
  return secret
}

export { readSecret }
