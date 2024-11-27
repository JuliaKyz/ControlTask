sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function(Controller, Filter, FilterOperator, Sorter) {
    "use strict";

    return Controller.extend("zjblessons.Worklist.controller.Worklist", {
        onInit: function() {
            this._bindTable(); // Привязываем таблицу при инициализации
        },

        _bindTable: function() {
            const oTable = this.getView().byId("table"); // Получаем ссылку на таблицу

            oTable.bindItems({
                path: "/zjblessons_base_MaterialsType", // Убедитесь, что путь правильный
                sorter: [new Sorter('MaterialID', true)],
                template: this._getTableTemplate()
            });
        },

        _getTableTemplate: function() {
            return new sap.m.ColumnListItem({
                cells: [
                    new sap.m.Text({ text: "{MaterialID}" }),
                    new sap.m.Text({ text: "{MaterialDescription}" })
                ]
            });
        },

        onSearch: function(oEvent) {
            const sValue = oEvent.getParameter("value");
            const oTable = this.getView().byId("table");
            const oBinding = oTable.getBinding("items");
            const aFilters = [];

            if (sValue) {
                aFilters.push(new Filter("MaterialID", FilterOperator.Contains, sValue));
            }

            oBinding.filter(aFilters);
        }
    });
});