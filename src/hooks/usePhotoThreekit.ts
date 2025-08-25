import { useThreekitInitStatus } from "@threekit-tools/treble/dist";
import { useState, useEffect } from "react";
import { waitThreekitConfiguratorReady } from "./useFilteredConfig";
import { ThreekitMetadataService } from "../services/ThreekitMetadataService";
import { THREEKIT_PARAMS } from "../config/threekit/threekitConfig";
import ThreekitURLGenerator from "../services/ThreekitURLGenerator";

export interface PhotoImage {
  url: string;
  camera: string;
  source: "threekit";
  id?: string;
}

export interface UsePhotoGalleryReturn {
  threekitImages: PhotoImage[];
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
}

export type UsePhotoGalleryOptions = {
  configuration?: Record<string, any>;
  cameras?: Array<string | number>;
};

function buildThreekitImages(params: {
  productId: string;
  orgId: string;
  stageId: string;
  authToken: string;
  cameras: Array<string | number>;
  configuration: Record<string, any>;
}): PhotoImage[] {
  const { productId, orgId, stageId, authToken, cameras, configuration } = params;

  return cameras.map((camera): PhotoImage => {
    const generator = new ThreekitURLGenerator({
      assetId: productId,
      orgId,
      stageId,
      bearer_token: authToken,
      display: "image",
      height: 2500,
      width: 2500,
      format: "jpg",
      configuration,
      stageConfiguration: { Camera: camera },
    });
    return {
      url: generator.generateURL(),
      camera: camera.toString(),
      source: "threekit",
    };
  });
}

/**
 * Generates Threekit images. External configuration and stageConfiguration can be passed.
 */
export const usePhotoGallery = (options: UsePhotoGalleryOptions = {}): UsePhotoGalleryReturn => {
  const [threekitImages, setThreekitImages] = useState<PhotoImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLoadDefaultConfiguration = useThreekitInitStatus();

  const { configuration, cameras } = options;

  // const productId = UrlService.getAsset() || THREEKIT_PARAMS?.assetId || "";
  const productId = window.threekit.player.assetId;

  // stable keys for dependencies
  const camerasKey = JSON.stringify(cameras ?? []);
  const configKey = JSON.stringify(configuration ?? {});

  const load = async () => {
    setIsLoading(true);
    setError(null);
    setIsReady(false);

    try {
      if (!configuration || Object.keys(configuration).length === 0) {
        throw new Error("Configuration is missing.");
      }
      if (!productId) {
        throw new Error("ProductId (assetId) is missing.");
      }

      await waitThreekitConfiguratorReady({
        predicate: async () => {
          return isLoadDefaultConfiguration;
        },
      });

      console.log("window.threekit.configurator.getMetadata() --- ==== ", window.threekit.configurator.getMetadata());
      // StageId: from metadata or fallback
      // @ts-ignore
      const metadata = new ThreekitMetadataService(window.threekit.configurator.getMetadata());
      const stageId = metadata.getStageId();

      console.log("stageId --- ==== ", stageId);

      if (stageId && THREEKIT_PARAMS.TOKEN && cameras && THREEKIT_PARAMS.ORG_ID) {
        // URL generation
        const images = buildThreekitImages({
          productId: productId,
          orgId: THREEKIT_PARAMS.ORG_ID,
          stageId,
          authToken: THREEKIT_PARAMS.TOKEN,
          cameras,
          configuration,
        });
        setThreekitImages(images);
      }

      setIsReady(true);
    } catch (e: any) {
      console.warn("usePhotoThreekit:", e);
      setError(e?.message ?? "Unknown error");
      setIsReady(true); // show UI even with errors
    } finally {
      setIsLoading(false);
    }
  };

  // Initialization/reload
  useEffect(() => {
    load();

    // rerunKeyRef.current allows forced reload
  }, [isLoadDefaultConfiguration, camerasKey, configKey]);

  return {
    threekitImages,
    isLoading,
    isReady,
    error,
  };
};
