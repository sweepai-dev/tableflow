package db

import (
	"errors"
	"gorm.io/gorm"
	"tableflow/go/pkg/model"
	"tableflow/go/pkg/tf"
)

func GetImporter(id string) (*model.Importer, error) {
	if len(id) == 0 {
		return nil, errors.New("no importer ID provided")
	}
	var importer model.Importer
	err := tf.DB.Preload("Template.TemplateColumns").
		First(&importer, model.ParseID(id)).Error
	if err != nil {
		return nil, err
	}
	if !importer.ID.Valid {
		return nil, gorm.ErrRecordNotFound
	}
	return &importer, nil
}

func GetImporterUnscoped(id string) (*model.Importer, error) {
	if len(id) == 0 {
		return nil, errors.New("no importer ID provided")
	}
	var importer model.Importer
	err := tf.DB.Unscoped().Preload("Template.TemplateColumns").
		First(&importer, model.ParseID(id)).Error
	if err != nil {
		return nil, err
	}
	if !importer.ID.Valid {
		return nil, gorm.ErrRecordNotFound
	}
	return &importer, nil
}

func GetImporterWithoutTemplate(id string) (*model.Importer, error) {
	if len(id) == 0 {
		return nil, errors.New("no importer ID provided")
	}
	var importer model.Importer
	err := tf.DB.First(&importer, model.ParseID(id)).Error
	if err != nil {
		return nil, err
	}
	if !importer.ID.Valid {
		return nil, gorm.ErrRecordNotFound
	}
	return &importer, nil
}

func GetImporterWithUsers(id string) (*model.Importer, error) {
	if len(id) == 0 {
		return nil, errors.New("no importer ID provided")
	}
	var importer model.Importer
	err := tf.DB.Preload("Template.TemplateColumns").
		Preload("CreatedByUser", userPreloadArgs).
		Preload("UpdatedByUser", userPreloadArgs).
		Preload("DeletedByUser", userPreloadArgs).
		First(&importer, model.ParseID(id)).Error
	if err != nil {
		return nil, err
	}
	if !importer.ID.Valid {
		return nil, gorm.ErrRecordNotFound
	}
	return &importer, nil
}

func GetImporters(workspaceID string) ([]*model.Importer, error) {
	if len(workspaceID) == 0 {
		return nil, errors.New("no workspace ID provided")
	}
	var importers []*model.Importer
	err := tf.DB.Preload("Template.TemplateColumns").
		Where("workspace_id = ?", workspaceID).
		Find(&importers).Error
	if err != nil {
		return nil, err
	}
	return importers, nil
}

func GetImportersWithUsers(workspaceID string) ([]*model.Importer, error) {
	if len(workspaceID) == 0 {
		return nil, errors.New("no workspace ID provided")
	}
	var importers []*model.Importer

	err := tf.DB.Preload("Template.TemplateColumns").
		Preload("CreatedByUser", userPreloadArgs).
		Preload("UpdatedByUser", userPreloadArgs).
		Preload("DeletedByUser", userPreloadArgs).
		Where("workspace_id = ?", workspaceID).
		Find(&importers).Error
	if err != nil {
		return nil, err
	}
	return importers, nil
}
