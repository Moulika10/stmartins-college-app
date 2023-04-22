import * as pack from "../../package.json"

interface HealthCheckResponse {
  status: string
  version: string
  info: string
  timestamp: string
  env: string
}

class HealthCheckController {
  public static healthCheck(): HealthCheckResponse {
    const timestamp = new Date().toISOString()
    const version: string = pack.version || "unknown"
    const env: string = process.env.NODE_ENV || "unknown"

    return {
      status: "up",
      version: version,
      info: "Service is healthy",
      timestamp: timestamp,
      env: env,
    }
  }

  public static liveness(): HealthCheckResponse {
    /**
     * Kubernetes will use this endpoint to monitor service's health.
     * In case it fails for a while, K8s will automatically try to restart the Pod
     * This endpoint should only monitor the main service process and should not return an error for temporary shortages.
     * Dependencies will be monitored using `readiness` endpoint
     * For more information: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-http-request
     *
     * @param req - Express request
     * @param res - Express response
     * @returns
     *
     */

    return HealthCheckController.healthCheck()
  }

  public static readiness(): HealthCheckResponse {
    /**
     * Kubernetes will use this endpoint to monitor if the service is responsive.
     * In case it fails, K8s will stop routing the traffic until the service is responsive again.
     * This endpoint should monitor all the underlying dependencies (databases, other API calls etc.)
     * For more information: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-readiness-probes
     *
     * @param req - Express request
     * @param res - Express response
     * @returns
     *
     */
    return HealthCheckController.healthCheck()
  }
}

export { HealthCheckController, HealthCheckResponse }
